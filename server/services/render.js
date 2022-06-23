const axios = require('axios');
var bukuPicPath = "/images/buku";

exports.adminRoutes = (req, res) =>{
    res.render('admin/index', {menu : 'master'});
}

// --------------------------------------------------------------- //

// Admin User
exports.userRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('admin/user/index', { users : response.data, menu : 'user'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_user = (req, res) =>{
    res.render('admin/user/add', {menu : 'user'});
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("admin/user/update", { user : userdata.data, menu : 'user'})
        })
        .catch(err =>{
            res.send(err);
        })
}

// --------------------------------------------------------------- //

// Admin Kategori
exports.kategoriRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/kategori')
        .then(function(response){
            res.render('admin/kategori/index', { kategori : response.data, menu : 'kategori'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_kategori = (req, res) =>{
    res.render('admin/kategori/add', {menu : 'kategori'});
}

exports.update_kategori = (req, res) =>{
    axios.get('http://localhost:3000/api/kategori', { params : { id : req.query.id }})
        .then(function(kategoridata){
            res.render("admin/kategori/update", { kategori : kategoridata.data, menu : 'kategori'})
        })
        .catch(err =>{
            res.send(err);
        })
}

// --------------------------------------------------------------- //

// Admin buku
exports.bukuRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/buku')
        .then(function(response){
            res.render('admin/buku/index', { buku : response.data, menu : 'buku'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_buku = (req, res) =>{
    res.render('admin/buku/add', {menu : 'buku'});
}

exports.update_buku = (req, res) =>{
    axios.get('http://localhost:3000/api/buku', { params : { id : req.query.id }})
        .then(function(bukudata){
            res.render("admin/buku/update", { buku : bukudata.data, menu : 'buku', baseUrl : req.get('host') + bukuPicPath})
        })
        .catch(err =>{
            res.send(err);
        })
}