const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {console.log('register');
    let user = new User(req.body);
    user.save((err,doc) => {
        if(!err){
            res.send(doc);
        }else{
           
            console.log('Error in user save'+ JSON.stringify(err, undefined ,2)); 
           
         }
    });
}



module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
 passport.authenticate('local', (err, user, info) => {  
    // error from passport middleware
    if (err){console.log('errooorr ');
        return res.status(400).json(err);
    } 
    // registered user
    else if (user) {
       return res.status(200).json({ "token": user.generateJwt() });
       console.log('Done');
    }
    // unknown user or wrong password
    else { 
        return res.status(404).json(info);
    }
    
})(req, res,next);
}


module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['FullName','Email']) });
        }
    );
}
