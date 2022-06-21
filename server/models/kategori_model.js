const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    urutan : Number,
    status : String,
})

const db = mongoose.model('tb_kategori', schema);

module.exports = db;