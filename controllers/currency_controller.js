const axios = require('axios');
const NodeCache = require( "node-cache" );
const Joi = require('joi');
const JoiCurrency = require('joi-currency-code')(require('@hapi/joi'));
const dotenv = require('dotenv');

const myCache = new NodeCache();

const schema = Joi.object({
    fromCurrency: Joi.string().length(3).case("upper").required(),
    amount :Joi.number(),
	toCurrency: Joi.string().length(3).case("upper").required()
  });
// Load env variables
dotenv.config({path:'./back_end_config.env'});
const API = process.env.API_KEY

exports.currencyValue =async (req,res,next)=>{
    value = myCache.get( "myKey" );
    if ( value == undefined ){
    // handle miss!
    
    res.status(400).send("cash empty");
    }else{
        try {
            const valid = await schema.validateAsync(req.body);
            let fromCurrency = await req.body.fromCurrency;
            let amount =await req.body.amount;
            let toCurrency=await req.body.toCurrency;
            let newAmount = await (amount/value.rates[fromCurrency])*value.rates[toCurrency];
            res.status(200).json({"amount": newAmount,"currency": toCurrency});
        }
        catch (err) {
            res.status(400).send("Invalid currency type");
         }
            
    }
    
}
exports.getBreeds = async () => {
    myCache.getStats();
    try {
        let data = await axios.get(`http://data.fixer.io/api/latest?access_key=${API}`)
        console.log(data.data);
        await myCache.set( "myKey", data.data, 86400 );
      return data
    } catch (error) {
      console.error(error)
    }
  }