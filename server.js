const express = require('express');
const session= require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const mongoose= require('mongoose');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(validator());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));
app.use(session({
    secret: 'supersecretstring12345!',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: (60000*30) },
   // store: new MongoStore({ mongooseConnection: mongoose.connection }) //not neccesary
  }))

require("./config/mongoose");
require('./config/routes')(app);

app.listen(8000, ()=>console.log('Server is listening on port 8000'));

//mongodb://root:root@ds131989.mlab.com:31989/todo