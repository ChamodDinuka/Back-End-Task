const { number } = require('joi');
const mongoose = require('mongoose');

const testModel = mongoose.Schema({
    name:String,
    description:String,
    age:Number
})

module.exports = mongoose.model('tests',testModel);