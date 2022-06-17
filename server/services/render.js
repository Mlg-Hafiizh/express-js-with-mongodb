const axios = require('axios');

exports.adminRoutes = (req, res) =>{
    res.render('admin/index');
}


// Admin User
exports.userRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('admin/user/index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_user = (req, res) =>{
    res.render('admin/user/add');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("admin/user/update", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

// --------------------------------------------------------------- //

// Admin News
exports.newsRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/news')
        .then(function(response){
            res.render('admin/news/index', { news : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_news = (req, res) =>{
    res.render('admin/news/add');
}

exports.update_news = (req, res) =>{
    axios.get('http://localhost:3000/api/news', { params : { id : req.query.id }})
        .then(function(newsdata){
            res.render("admin/news/update", { news : newsdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}


// --------------------------------------------------------------- //


exports.liveRoutes = (req, res) => {
    res.render('live/index');
}
