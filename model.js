const mongoose = require('mongoose');

const testModel = mongoose.Schema({
    name:String,
    description:String
})

module.exports = mongoose.model('tests',testModel);