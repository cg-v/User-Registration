require('./config/passportConfig');
require('./config/config');
require('./models/db');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');
var app= express();
var User = mongoose.model('User');

//midleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api', rtsIndex);

//getting all users
/* router.get('/user', (req, res) => {
    User.find((err,listofEmployees) => {
        if(err)
            console.log(err);
        else
            res.json(listofEmployees);
         });
}); 


/* 
app.use('/',router);
app.listen(4000, () => console.log('Express server running on port 4000')); */

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));