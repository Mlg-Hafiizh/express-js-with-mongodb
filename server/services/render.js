const axios = require('axios');
var bukuPicPath = "/images/buku";
var facePicPath = "/images/faces";

exports.adminRoutes = (req, res) =>{
    res.render('admin/index', {menu : 'master'});
}

// --------------------------------------------------------------- //

// Admin User
exports.userRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params : { cari : req.query.cari }})
        .then(function(response){
            res.render('admin/user/index', { users : response.data, menu : 'user'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_user = (req, res) =>{
    res.render('admin/user/add', {menu : 'user', baseUrl : req.get('host')});
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("admin/user/update", { user : userdata.data, menu : 'user', baseUrl : req.get('host') + facePicPath})
        })
        .catch(err =>{
            res.send(err);
        })
}


// --------------------------------------------------------------- //


// Admin Member
exports.memberRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/members', { params : { cari : req.query.cari }})
        .then(function(response){
            res.render('admin/member/index', { members : response.data, menu : 'member'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_member = (req, res) =>{
    res.render('admin/member/add', {menu : 'member', baseUrl : req.get('host')});
}

exports.update_member = (req, res) =>{
    axios.get('http://localhost:3000/api/members', { params : { id : req.query.id }})
        .then(function(memberdata){
            res.render("admin/member/update", { member : memberdata.data, menu : 'member', baseUrl : req.get('host') + facePicPath})
        })
        .catch(err =>{
            res.send(err);
        })
}

// --------------------------------------------------------------- //

// Admin Kategori
exports.kategoriRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/kategori', { params : { cari : req.query.cari }})
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
    axios.get('http://localhost:3000/api/buku', { params : { cari : req.query.cari }})
        .then(function(response){
            res.render('admin/buku/index', { buku : response.data, menu : 'buku'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_buku = (req, res) =>{
    res.render('admin/buku/add', {menu : 'buku', baseUrl : req.get('host')});
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

// --------------------------------------------------------------- //

// Admin role
exports.roleRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/role', { params : { cari : req.query.cari }})
        .then(function(response){
            res.render('admin/role/index', { role : response.data, menu : 'role'});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_role = (req, res) =>{
    res.render('admin/role/add', {menu : 'role'});
}

exports.update_role = (req, res) =>{
    axios.get('http://localhost:3000/api/role', { params : { id : req.query.id }})
        .then(function(roledata){
            res.render("admin/role/update", { role : roledata.data, menu : 'role'})
        })
        .catch(err =>{
            res.send(err);
        })
}

// --------------------------------------------------------------- //

// Admin Peminjaman
exports.pinjamRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/pinjam', { params : { cari : req.query.cari }})
        .then(function(response){
            console.log(response.data);
            res.render('admin/pinjam/index', { buku : response.data,  menu : 'pinjam', baseUrl : req.get('host')});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_pinjam = (req, res) =>{
    res.render('admin/pinjam/add', {menu : 'pinjam'});
}

exports.update_pinjam = (req, res) =>{
    axios.get('http://localhost:3000/api/pinjam', { params : { id : req.query.id }})
        .then(function(pinjamdata){
            res.render("admin/pinjam/update", { pinjam : pinjamdata.data.pinjam, menu : 'pinjam'})
        })
        .catch(err =>{
            res.send(err);
        })
}

// --------------------------------------------------------------- //