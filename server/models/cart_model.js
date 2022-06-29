const mongoose = require('mongoose');
var tb_buku    = require('../models/buku_model');

var schema = new mongoose.Schema({
    id_kasir : {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nama_kasir : String,
    id_buku: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nama_buku : String,
    jumlah: {
        type: Number,
        required: true
    },
    harga_total: Number,
    status : String,
});

const db = mongoose.model('tb_cart', schema);

module.exports = db;