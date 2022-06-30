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
    keterangan : String,
    status : String,
})

const db = mongoose.model('tb_buku', schema);

module.exports = db;