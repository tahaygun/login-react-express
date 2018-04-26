var mongoose = require("mongoose");
var validator = require('express-validator');
var User = mongoose.model('User')

function createUser(req, res, next) {
    const user = new User(req.body);
    user.password = user.hashPassword(user.password);
    req.checkBody("email", "Enter a valid email address.").isEmail();
    req.checkBody("name", "Enter a valid name please.").isAlpha();

    var errors = req.validationErrors();
    if (errors) {
       return res.send({errors: errors});
    }else{
        user.save((err)=>{
            if(err){
                console.log("Error saving user", user);
                return next();
            }
            res.json({ok:true})
        })
    }
 
}

function getAllUsers(req, res, next) {
    User.find({},['name','email', 'jobtitle'],(err,users)=>{
        if (err) {
            console.log("Error getting users"+err);
            return next();
        }
        res.json(users)
    })
}

function loginUser(req, res, next) {
    User.findOne({email:req.body.email}, (err,user)=>{
        if (err) {
            console.log("Error getting user:"+ err);
            return next();
        }
        if(!user) return res.json({err: true, message: "User does not exist"});
       if (!(user.comparePassword(req.body.password, user.password))) {  return res.json({err:true , message:"Password is wrong!"})
    }
        req.session.user= user;
        req.session.isLoggedin=true;
        res.json(user);
          
       
    })
}

function authenticateUser(req, res, next) {
    if(req.session.user) return next();
    res.json({err:true, message: "Not authenticated"});
}
function currentUser(req,res,next) {
    if (req.session.user) {
       return User.find({_id:req.session.user._id},['name','email','jobtitle'],(err,user)=>{
            if(err){
                console.log("Error getting the user", err);
                return next();
            }
            return res.json({user, isLoggedin:true});
        })
    }
    res.json({err:true, message: "Not authenticated"});
}
function findUser(req, res, next) {
    User.findOne({_id:req.params.userId},['name','email', 'jobtitle'], (err, user)=>{
        if(err){
            console.log("Error getting the user", err); 
            return next();
        }
        res.json(user);
    })
}


module.exports= {
    createUser,
    getAllUsers,
    loginUser,
    authenticateUser,
    findUser,
    currentUser
}