var tb_user = require('../models/user_model');
var formidable = require('formidable');
var fs         = require('fs');
var path       = require("path");

// create and save new user
exports.create = (req,res)=>{
    var formData = new formidable.IncomingForm();
    formData.parse(req, function(err,fields,files){
        if(!fields){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }
        var extension = files.picture.originalFilename.substr(files.picture.originalFilename.lastIndexOf(".")); //.png | .jpg 
        var newPath = path.resolve(__dirname,"../../assets/images/faces/") + "\\" + files.picture.newFilename + extension; // localhost:3000 
        
        const user = new tb_user({
            name : fields.name,
            email : fields.email,
            role : fields.role,
            picture : files.picture.newFilename + extension,
            gender: fields.gender,
            status : fields.status,
        })
    
        fs.copyFile(files.picture._writeStream.path, newPath, function(errorRename) {

            user
            .save(user)
            .then(data => {
                // res.send('data')
                res.redirect('/add-user');
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

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        tb_user.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    } else if(req.query.cari){
        const cari = req.query.cari;

        tb_user.find({$or:[{name:new RegExp(cari, 'i')},{email:new RegExp(cari, 'i')}]})
            .then(data => {  
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
        tb_user.find().sort({ name : "asc"})
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
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
            tb_user.findByIdAndUpdate(id, fields, { useFindAndModify: false})
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message : "Error Update user information"})
            })            
        });
    });
    
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    tb_user.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
