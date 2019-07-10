//import passport from 'passport';
require("../models/User.js");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;


//import passportLocal from 'passport-local';
//import mongoose from 'mongoose';


//var LocalStrategy = passportLocal.Strategy;
//var User = mongoose.model('User',User);
var User = mongoose.model('User');

 passport.use(
    new LocalStrategy({ usernameField: 'Email',passwordField :'Password'},
    (username, password, done) => { 
        User.findOne({ Email: username },
            (err,user) =>{
                if(err){console.log('error');
                    
                    //return done(err);
                }
                    //unknown user
                else if(!user){console.log('errsuccessor');
                    return done(null,false, { message: 'Email is not registered'});
                }
                    
                    //wrong password
                else if(!user.verifyPassword(password)){
                    return done(null,false, { message: 'Wrong password'});
                } 
                    
                    //authenticaton succeeded 
                else{
                    
                    return done(null,user);
                }
            });
    })
);  

/* passport.use(
    new LocalStrategy({ usernameField: 'Email',passwordField :'Password'},
    (username, password, done) => { console.log(username);
        User.findOne({ 'Email': 'chithu@gmail.com' })
        .then((user) => {console.log('in passport');
            if(!user){
                return done(null,false,{ message : 'that email is not registered'});
            }
        })
        .catch(err => console.log('errrrrroorr full'));
    }
    )
); */