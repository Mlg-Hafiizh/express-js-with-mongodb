const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    role : {
        type : String,
        required: true
    },
    picture : String,
    gender : String,
    status : String,
})

const db = mongoose.model('tb_users', schema);

module.exports = db;