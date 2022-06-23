const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    isbn : {
        type : String,
        required: true,
        unique : true,
    },
    name : {
        type : String,
        required: true
    },
    deskripsi : String,
    kategori : String,
    picture : String,
    harga : {
        type: Number, 
        min: 0, 
        default: 0, 
        required: true
    },
    status : String,
})

const db = mongoose.model('tb_buku', schema);

module.exports = db;