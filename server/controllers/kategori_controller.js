var tb_kategori = require('../models/kategori_model');

// create and save new user
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    const kategori = new tb_kategori({
        name : req.body.name,
        urutan : req.body.urutan,
        status : req.body.status,
    })

    kategori
        .save(kategori)
        .then(data => {
            res.redirect('/add-kategori');
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

        tb_kategori.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found kategori with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving kategori with id " + id})
            })

    }else{
        tb_kategori.find()
            .then(kategori => {
                res.send(kategori)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving kategori information" })
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
    tb_kategori.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update kategori with ${id}. Maybe kategori not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update kategori information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    tb_kategori.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Kategori was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Kategori with id=" + id
            });
        });
}
