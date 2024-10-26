const express = require('express');
const router = express.Router();
const user=require("../models/user.js");
const { append } = require('../joi');
const passport=require("passport")
const usercontroller =require("../controllers/user.js")

router.get("/signup",(usercontroller.signupform))

router.post("/signup",(usercontroller.signup))



router.get("/login",(usercontroller.loginform))

router.post("/login",passport.authenticate
    ("local", {failureRedirect:"/login",failureFlash:true}),
    (usercontroller.loginaauthontication)
);

router.get("/logout",(usercontroller.logout));

module.exports=router;