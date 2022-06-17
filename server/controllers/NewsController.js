var db = require('../models/NewsModel');

// create and save new news
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Form tidak boleh kosong"});
        return;
    }

    // new news
    const news = new db({
        judul           : req.body.judul,
        deskripsi       : req.body.deskripsi,
        gambar          : req.body.gambar,
        penulis         : req.body.penulis,
        tanggal_input   : req.body.tanggal_input
    })

    // save news in the database
    news
        .save(news)
        .then(data => {
            //res.send(data)
            res.redirect('/add-news');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Terdapat error ketika membuat berita."
            });
        });

}

// retrieve and return all newss/ retrive and return a single news
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        db.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Pencarian berita dengan id ("+ id +") tidak ditemukan."})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Terjadi error ketika menerima berita dengan id " + id})
            })

    }else{
        db.find()
            .then(news => {
                res.send(news)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Terjadi error ketika menerima informasi berita." })
            })
    }

    
}

// Update a new idetified news by news id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Tidak bisa merubah berita jika data kosong."})
    }

    const id = req.params.id;
    db.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Tidak bisa merubah berita dengan id ${id}. Kemungkinan berita tidak ditemukan!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Terjadi error ketika merubah informasi berita."})
        })
}

// Delete a news with specified news id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    db.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Tidak bisa menghapus berita dengan id ${id}. Kemungkinan salah mengambil id.`})
            }else{
                res.send({
                    message : "Berita berhasil dihapus!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Tidak bisa menghapus berita dengan id" + id
            });
        });
}