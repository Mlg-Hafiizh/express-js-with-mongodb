const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controllers/controller');
const NewsController = require('../controllers/NewsController');

// Admin Index
route.get('/', services.adminRoutes);

// User Section
// Page
route.get('/users', services.userRoutes);
route.get('/add-user', services.add_user)
route.get('/update-user', services.update_user)

// API 
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// --------------------------------------------------------------- //

// News Section
route.get('/news', services.newsRoutes);
route.get('/add-news', services.add_news)
route.get('/update-news', services.update_news)

// API 
route.post('/api/news', NewsController.create);
route.get('/api/news', NewsController.find);
route.put('/api/news/:id', NewsController.update);
route.delete('/api/news/:id', NewsController.delete);

// --------------------------------------------------------------- //

// Live Index
route.get('/live', services.liveRoutes);

module.exports = route