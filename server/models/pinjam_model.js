const mongoose = require('mongoose');
var tb_buku    = require('./buku_model');

var schema = new mongoose.Schema({
    id_pegawai : {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nama_pegawai : String,
    id_buku: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nama_buku : String,
    tgl_pinjam: Date,
    tgl_kembali: Date,
    keterangan: String,
    status : String,
});

const db = mongoose.model('tb_pinjam', schema);

module.exports = db;