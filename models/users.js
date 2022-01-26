const  mongoose = require("mongoose");

//Const Schema 
const Schema = mongoose.Schema;

const Users= new Schema({
    username: {type:String, required:true},
    telegramID: {type:Number, required:true},
    first_name:String,
    date: Date,
    email:String,
})

module.exports = mongoose.model("Users",Users);