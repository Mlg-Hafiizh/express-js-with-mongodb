var tb_pinjam = require('../models/pinjam_model');
var tb_buku    = require('../models/buku_model');

exports.create = (req,res) => { 
    tb_buku.findById(req.body.id_buku).then(data =>{
        const pinjam = new tb_pinjam({
            id_pegawai : req.body.id_kasir,
            nama_pegawai : req.body.nama_kasir,
            id_buku : req.body.id_buku,
            nama_buku : req.body.nama_buku,
            tgl_pinjam : req.body.tgl_pinjam,
            tgl_kembali : req.body.tgl_kembali,
            keterangan : "Dipinjam",
            status : "Active",
        });

        pinjam
            .save(pinjam)
            .then(data => {
                // res.status(200).send(data);
                tb_buku.findOneAndUpdate({ _id : req.body.id_buku },{ keterangan : 'Sedang dipinjam' })
                    .then(data => {
                        if(!data){
                            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
                        }else{
                            res.redirect('/pinjam');
                        }
                    })
                    .catch(err =>{
                        res.status(500).send({
                            message: "Could not delete buku with id=" + id
                        });
                    });
                
            })
            .catch(err =>{
                res.status(500).send({
                    message : err.message || "Some error occurred while creating a create operation"
                });
            });
    })
    .catch(err =>{
        res.status(500).send({ message: "Error create cart with buku " + req.body.nama_buku + ". Error : " + err});
    })
    
};

exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        tb_pinjam.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found cart with id "+ id});
                }else{
                    res.send(data);                    
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving cart with id " + id});
            })
    } else if(req.query.cari){
        const cari = req.query.cari;
        tb_buku.findOne({name : new RegExp(cari, 'i')})
            .then(data => {  
                if(!data){
                    res.status(404).send({ message : "Not found cart with cari "+ cari});
                }else{
                    res.send(data);
                } 
            })
            .catch(err => { 
                res.status(500).send({ message: "Error retrieving cart with cari " + cari + ". " + err});
            })
    } else {
        var status = "";
        if(req.query.status) {
            status = req.query.status;
        } 
        tb_pinjam.find({status : { $regex: '.*' + status + '.*' }}).sort({ urutan : "asc"})
            .then(cart => {
                res.send(cart);
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving cart information" });
            })
    }
};
