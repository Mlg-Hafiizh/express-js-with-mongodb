var tb_member = require('../models/member_model');
var formidable = require('formidable');
var fs         = require('fs');
var path       = require("path");

// create and save new member
exports.create = (req,res)=>{
    var formData = new formidable.IncomingForm();
    formData.parse(req, function(err,fields,files){
        if(!fields){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }
        var extension = files.picture.originalFilename.substr(files.picture.originalFilename.lastIndexOf(".")); //.png | .jpg 
        var newPath = path.resolve(__dirname,"../../assets/images/faces/") + "\\" + files.picture.newFilename + extension; // localhost:3000 
        
        const member = new tb_member({
            name : fields.name,
            ids : fields.ids,
            email : fields.email,
            no_telpn : fields.no_telpn,
            picture : files.picture.newFilename + extension,
            gender: fields.gender,
            status : fields.status,
        })
    
        fs.copyFile(files.picture._writeStream.path, newPath, function(errorRename) {

            member
            .save(member)
            .then(data => {
                // res.send('data')
                res.redirect('/add-member');
            })
            .catch(err =>{
                res.status(500).send({
                    message : err.message || "Some error occurred while creating a create operation of member"
                });
            });

        });
    });
}

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        tb_member.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found member with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving member with id " + id})
            })
    } else if(req.query.cari){
        const cari = req.query.cari;

        tb_member.find({$or:[
                {name:new RegExp(cari, 'i')},
                {email:new RegExp(cari, 'i')},
                {no_telpn:new RegExp(cari, 'i')},
                {ids:new RegExp(cari, 'i')}
            ]}).then(data => {  
                if(!data){
                    res.send(data);
                }else{
                    res.send(data);
                } 
            })
            .catch(err => { 
                res.status(500).send({ message: "Error retrieving data with cari " + cari + ". " + err});
            })
    } else {
        tb_member.find().sort({ name : "asc"})
            .then(member => {
                res.send(member)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving member information" })
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
        var newPath = path.resolve(__dirname,"../../assets/images/faces/") + "\\" + fields.picture_old;
        fs.copyFile(files.picture._writeStream.path, newPath, function(errorRename) {
            tb_member.findByIdAndUpdate(id, fields, { useFindAndModify: false})
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Update member with ${id}. Maybe member not found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message : "Error Update member information"})
            })            
        });
    });
    
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    tb_member.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "member was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete member with id=" + id
            });
        });
}
