const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    judul : {
        type : String,
        required: true
    },
    deskripsi : {
        type : String,
        required: true
    },
    gambar : {
        type : String,
        required: true
    },
    penulis : {
        type : String,
        required: true
    },
    tanggal_input : {
        type : String,
        required: true
    },
})

const db = mongoose.model('newsdb', schema);

module.exports = db;