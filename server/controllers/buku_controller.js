var tb_buku    = require('../models/buku_model');
var formidable = require('formidable');
var fs         = require('fs');
var path       = require("path");
const { log } = require('console');

exports.create = (req,res) => { 
    var formData = new formidable.IncomingForm();
    formData.parse(req, function(err,fields,files){
        if(!fields){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }
        var extension = files.picture.originalFilename.substr(files.picture.originalFilename.lastIndexOf(".")); //.png | .jpg 
        var newPath = path.resolve(__dirname,"../../assets/images/buku/") + "\\" + files.picture.newFilename + extension; // localhost:3000 
        
        const buku = new tb_buku({
            isbn : fields.isbn,
            name : fields.name,
            deskripsi: fields.deskripsi,
            kategori: fields.kategori,
            picture : files.picture.newFilename + extension,
            harga : fields.harga,
            stok : fields.stok,
            status : fields.status,
        })
    
        fs.copyFile(files.picture._writeStream.path, newPath, function(errorRename) {

            buku
            .save(buku)
            .then(data => {
                // res.send('data')
                res.redirect('/add-buku');
            })
            .catch(err =>{
                res.status(500).send({
                    message : err.message || "Some error occurred while creating a create operation"
                });
            });

            // res.send("File saved = " + newPath); 
        });
    });

}

exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        tb_buku.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found buku with id "+ id})
                }else{
                    res.send(data); 
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving buku with id " + id})
            })
    } else if(req.query.cari){
        const cari = req.query.cari;
        console.log(cari);
        tb_buku.find({$or:[{name:new RegExp(cari, 'i')},{kategori:new RegExp(cari, 'i')},{isbn:new RegExp(cari, 'i')}]})
            .then(data => {  
                if(!data){
                    res.status(404).send({ message : "Not found buku with cari "+ cari})
                }else{
                    res.send(data);
                } 

            })
            .catch(err => { 
                res.status(500).send({ message: "Error retrieving data with cari " + cari + ". " + err});
            })
        } else if(req.query.cart){
            const cart = req.query.cart;
            tb_buku.findOne({$or:[{name:new RegExp(cart, 'i')},{kategori:new RegExp(cart, 'i')},{isbn:new RegExp(cart, 'i')}]})
                .then(data => {  
                    if(!data){
                        res.status(404).send({ message : "Not found buku with cart "+ cart})
                    }else{
                        res.send(data);
                    } 
    
                })
                .catch(err => { 
                    res.status(500).send({ message: "Error retrieving data with cari " + cart + ". " + err});
                })
    }else{
        tb_buku.find().sort({ name : "asc"})
            .then(buku => {
                res.send(buku)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving buku information" })
            })
    }

    
}

exports.update = (req, res)=>{
    const id = req.params.id;
    var formData = new formidable.IncomingForm();
    formData.parse(req, function(err,fields,files){
        if(!fields){
            res.status(400).send({ message : "Data to update can not be empty"});
            return;
        }
        var newPath = path.resolve(__dirname,"../../assets/images/buku/") + "\\" + fields.picture_old;
        fs.copyFile(files.picture._writeStream.path, newPath, function(errorRename) {
            tb_buku.findByIdAndUpdate(id, fields, { useFindAndModify: false})
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Update buku with ${id}. Maybe buku not found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message : "Error Update buku information"})
            })            
        });
    });
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    tb_buku.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "buku was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete buku with id=" + id
            });
        });
}
