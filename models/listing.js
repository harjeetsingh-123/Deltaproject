const mongoose = require('mongoose');
const Review = require('./review');
const { type, schema } = require('../joi');
const { required, ref } = require('joi');
const {Schema}=mongoose;
const{Reviews}=require("./review");


let listschema= new mongoose.Schema({
    title:{
    type :String,
    require:true
},
description:{
    type:String,
    require:true
},
image:{
    url:String,
    filename:String
},

price:{ 
    type:Number,
    require:true
},
location:{
    type:String,
    require:true
},
country:{
    type:String,
    require:true
},

Reviews:[

    { type: Schema.Types.ObjectId, 
        ref: 'Review'

    }
],
owner:{ 
    type: Schema.Types.ObjectId,
    ref: 'User ' 
    },

    
});

let Listing=mongoose.model("Listing",listschema);


module.exports=Listing;
