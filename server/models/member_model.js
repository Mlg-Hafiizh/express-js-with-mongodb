const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    ids : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    no_telpn : {
        type : String,
        required: true
    },
    picture : String,
    gender : String,
    status : String,
})

const db = mongoose.model('tb_member', schema);

module.exports = db;