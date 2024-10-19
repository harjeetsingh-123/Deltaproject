const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// const { type } = require('../joi');

const userSchema = new Schema({
    Email:{
        type:String,
        require:true
    }
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User',userSchema);

module.exports= User ;

