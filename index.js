const express       = require("express");
const dotenv        = require("dotenv");
const morgan        = require("morgan");
const bodyparser    = require("body-parser");
const multer        = require("multer");
const path          = require("path");

const connectDB = require('./server/databases/connection');

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// menambahkan folder ke dalam engine ejs
app.set("view engine","ejs");

// menambahkan sub folder ke dalam engine ejs
app.set("views",path.resolve(__dirname,"./views"));

// load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css"))); 
app.use("/images",express.static(path.resolve(__dirname,"assets/images"))); 
app.use("/js",express.static(path.resolve(__dirname,"assets/js"))); 
app.use("/vendors",express.static(path.resolve(__dirname,"assets/vendors"))); 

// load routers
app.use('/', require('./server/routes/router'));

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/views/template/404-not-found.html');
});

app.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});
