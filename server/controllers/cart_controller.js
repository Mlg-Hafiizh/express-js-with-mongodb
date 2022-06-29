var tb_cart = require('../models/cart_model');
var tb_buku    = require('../models/buku_model');

exports.create = (req,res) => { 
    var val_id_buku = req.body.id_buku;
    var val_id_kasir = req.body.id_kasir;
    tb_buku.findById(val_id_buku).then(data =>{
        const cart = new tb_cart({
            id_kasir : val_id_kasir,
            nama_kasir : val_kasir,
            id_buku : val_id_buku,
            nama_buku : req.body.nama_buku,
            jumlah : val_qty,
            harga_total : req.body.nama_buku,
            status : "Cart",
        });
        cart
            .save(cart)
            .then(data => {
                // res.status(200).send(data);
                res.redirect('/cart');
            })
            .catch(err =>{
                res.status(500).send({
                    message : err.message || "Some error occurred while creating a create operation"
                });
            });
    })
    .catch(err =>{
        res.status(500).send({ message: "Error retrieving cart with id " + val_id_buku + ". Error : " + err});
    })
    
};

exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        tb_cart.findById(id)
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

        tb_cart.find({name : new RegExp(cari, 'i')})
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
    }else{
        var status = "";
        if(req.query.status) {
            status = req.query.status;
        } 
        //SELECT * FROM tb_buku WHERE status LIKE '% $status %';
        tb_cart.find({status : { $regex: '.*' + status + '.*' }}).sort({ urutan : "asc"})
            .then(cart => {
                res.send(cart);
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving cart information" });
            })
    }
};
