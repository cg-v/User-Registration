/* import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var JWT_SECRET=`secret123`;
var userSchema = new mongoose.Schema({
    Username :{
        type :String,
        required : 'User name can\'t be empty'
    },
   Email :{
        type :String,
        required : 'Email can\'t be empty',
        unique : true
    },
    FullName :{
        type :String
    },
   Password :{
        type :String,
        required : 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret : String
});

/* // Custom validation for email
User.path('Email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.'); */

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.Password, salt, (err, hash) => {
            this.Password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//methods
userSchema.methods.verifyPassword= function (password){
    return bcrypt.compareSync(password, this.Password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

export default mongoose.model('User',userSchema);