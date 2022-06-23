var tb_buku = require('../models/buku_model');
var formidable = require('formidable');
var fs = require('fs');
var path          = require("path");

// create and save new buku
exports.create = (req,res) => { 
    var formData = new formidable.IncomingForm();
    formData.parse(req, function(err,fields,files){
          // validate request
        if(!fields){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }

        var extension = files.myImage.originalFilename.substr(files.myImage.originalFilename.lastIndexOf("."));
        var newPath = path.resolve(__dirname,"../../assets/images/buku/") + "\\" + files.myImage.newFilename + extension;
        
        const buku = new tb_buku({
            isbn : fields.isbn,
            name : fields.name,
            deskripsi: fields.deskripsi,
            kategori: fields.kategori,
            picture : files.myImage.newFilename + extension,
            stok : fields.stok,
            harga : fields.harga,
            status : fields.status,
        })
    
        fs.copyFile(files.myImage._writeStream.path, newPath, function(errorRename) {

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

    }else{
        tb_buku.find()
            .then(buku => {
                res.send(buku)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving buku information" })
            })
    }

    
}

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    tb_buku.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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
