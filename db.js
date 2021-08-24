const mongoose = require('mongoose');

const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.connection,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`connected : ${conn.connection.host}`);
}

module.exports = connectDB