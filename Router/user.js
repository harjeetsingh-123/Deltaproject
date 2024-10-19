const express = require('express');
const router = express.Router();
const user=require("../models/user.js");
const { append } = require('../joi');
const passport=require("passport")

router.get("/signup",(req,res)=>{
    res.render("../views/users/signup.ejs")
})
router.post("/signup",async(req,res)=>{
    try {
        let {username ,password ,email}=req.body;
        let newuser=new user({username, email});
        let registeruser=await user.register(newuser,password)
        console.log(registeruser);
        req.flash("success","Welcome to Wonderlust");
        res.redirect("/listings");
    } catch (error) {
        req.flash("error",error.message)
        res.redirect("/signup")   
    }
})


router.get("/login",(req,res)=>{
    res.render("../views/users/login.ejs")
})

router.post("/login",passport.authenticate("local", {failureRedirect:"/login",failureFlash:true}),async(req,res)=>{
        
    }  
    
)
module.exports=router;