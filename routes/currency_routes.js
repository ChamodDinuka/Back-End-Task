const express = require('express');
const testModel = require('../model')
const router = express.Router();

router.get('/test',async(req,res)=>{
    try{
        const test = await testModel.find();
        if(!test){
            return res.send("No records founds");
        }
        res.send(test);
    }catch(err){
        res.status(400).send("Bad Request");
    }
    
})
router.post('/test',async(req,res)=>{
    const data = req.body
    try{
        const newTest = await testModel.create(data);
        res.status(200).send(newTest)
    }catch(err){
        res.send(err);
    }
})
router.put('/test',async(req,res)=>{
    const id = req.query.id;
    const data = req.body;
    try{
        const updateTest = await testModel.findByIdAndUpdate(id,data);
        res.status(200).send(updateTest)
    }catch(err){
        res.send(err);
    }
})
//filtering end point
router.get('/getFilter',async(req,res)=>{
    let queryString = JSON.stringify(req.query);
    let queryStr = queryString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
    console.log(queryStr);
    try{
        const test = await testModel.find(JSON.parse(queryStr));
        if(!test){
            return res.send("No records founds");
        }
        res.send(test);
    }catch(err){
        res.status(400).send("Bad Request");
    }
})
//take field and sort
router.get('/column',async(req,res)=>{
    try{
        const test = await testModel.find().select('age').sort('age').limit(2);
        res.send(test)
    }catch{
        res.status(400).send("Bad Request");
    }
})

module.exports = router;