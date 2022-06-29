const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    status : String,
})

const db = mongoose.model('tb_role', schema);

module.exports = db;