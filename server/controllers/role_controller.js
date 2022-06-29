var tb_role = require('../models/role_model');

// create and save new user
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    const role = new tb_role({
        name : req.body.name,
        status : req.body.status,
    })

    role
        .save(role)
        .then(data => {
            res.redirect('/add-role');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        tb_role.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found role with id "+ id});
                }else{
                    res.send(data);
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving role with id " + id});
            })
    } else if(req.query.cari){
        const cari = req.query.cari;
        tb_role.find({name : new RegExp(cari, 'i')})
            .then(data => {  
                if(!data){
                    res.status(404).send({ message : "Not found role with cari "+ cari});
                }else{
                    res.send(data);
                } 
            })
            .catch(err => { 
                res.status(500).send({ message: "Error retrieving role with cari " + cari + ". " + err});
            })
    }else{
        var status = "";
        if(req.query.status) {
            status = req.query.status;
        } 
        //SELECT * FROM tb_buku WHERE status LIKE '% $status %';
        tb_role.find({status : { $regex: '.*' + status + '.*' }}).sort({ name : "asc"})
            .then(role => {
                res.send(role);
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving role information" });
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
    tb_role.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update role with ${id}. Maybe role not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update role information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    tb_role.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "role was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete role with id=" + id
            });
        });
}
