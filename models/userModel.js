const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UsersSchema = new Schema({
    name: String,
    email: String,
    password:String,
    jobtitle: String,
    createdAt:{
        type: Date, 
        default: Date.now 
    },
    updatedAt:{type:Date, default:Date.now}
})

//add method to model

UsersSchema.methods.hashPassword=function(password) {
    return bcrypt.hashSync(password, 12);
}
UsersSchema.methods.comparePassword = function(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}
mongoose.model("User",UsersSchema);

