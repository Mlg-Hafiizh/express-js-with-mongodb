const express = require('express');
const route = express.Router()

const services = require('../services/render');
const user_controller = require('../controllers/user_controller');
const member_controller = require('../controllers/member_controller');
const kategori_controller = require('../controllers/kategori_controller');
const buku_controller = require('../controllers/buku_controller');
const role_controller = require('../controllers/role_controller');
const pinjam_controller = require('../controllers/pinjam_controller');

// Admin Index
route.get('/', services.adminRoutes);
// --------------------------------------------------------------- //

// User Section
// Page
route.get('/users', services.userRoutes);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

// API
route.post('/api/users', user_controller.create);
route.get('/api/users', user_controller.find);
route.put('/api/users/:id', user_controller.update);
route.delete('/api/users/:id', user_controller.delete);

// --------------------------------------------------------------- //

// Member Section
// Page
route.get('/member', services.memberRoutes);
route.get('/add-member', services.add_member);
route.get('/update-member', services.update_member);

// API
route.post('/api/members', member_controller.create);
route.get('/api/members', member_controller.find);
route.put('/api/members/:id', member_controller.update);
route.delete('/api/members/:id', member_controller.delete);

// --------------------------------------------------------------- //

// Kategori Section
// Page
route.get('/kategori', services.kategoriRoutes);
route.get('/add-kategori', services.add_kategori);
route.get('/update-kategori', services.update_kategori);

// API
route.post('/api/kategori', kategori_controller.create);
route.get('/api/kategori', kategori_controller.find);
route.put('/api/kategori/:id', kategori_controller.update);
route.delete('/api/kategori/:id', kategori_controller.delete);

// --------------------------------------------------------------- //

// Buku Section
// Page
route.get('/buku', services.bukuRoutes);
route.get('/add-buku', services.add_buku);
route.get('/update-buku', services.update_buku);

// API
route.post('/api/buku', buku_controller.create);
route.get('/api/buku', buku_controller.find);
route.put('/api/buku/:id', buku_controller.update);
route.delete('/api/buku/:id', buku_controller.delete);

// --------------------------------------------------------------- //

// Role Section
// Page
route.get('/role', services.roleRoutes);
route.get('/add-role', services.add_role);
route.get('/update-role', services.update_role);

// API
route.post('/api/role', role_controller.create);
route.get('/api/role', role_controller.find);
route.put('/api/role/:id', role_controller.update);
route.delete('/api/role/:id', role_controller.delete);

// --------------------------------------------------------------- //


// Peminjaman Section
// Page
route.get('/pinjam', services.pinjamRoutes);
route.get('/add-pinjam', services.add_pinjam);
route.get('/update-pinjam', services.update_pinjam);

// API
route.post('/api/pinjam', pinjam_controller.create);
route.get('/api/pinjam', pinjam_controller.find);
// route.put('/api/pinjam/:id', pinjam_controller.update);
// route.delete('/api/pinjam/:id', pinjam_controller.delete);

// --------------------------------------------------------------- //



module.exports = route