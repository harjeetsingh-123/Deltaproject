const express = require('express')
const app = express()
const path=require("path"); 
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const ejsmate = require('ejs-mate');
const Review = require('./models/review.js');
const ExpressError=require("./utils/ExpressError.js")
const listingsrouter=require("./Router/listings.js");
const reviewsrouter= require("./Router/review.js");
const userrouter= require("./Router/user.js");
const WrapeAsync = require("./utils/wrapeAsync.js");
const  flash = require('connect-flash');
const  session = require('express-session')
const passport=require("passport");
const LocalStrategy=require("passport-local")
const User = require('./models/user.js');


//// database connection 


main().then((res)=>{
    console.log("connection success !")
})
.catch((err)=>{
    console.log("some Error occureed !" )
})

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
};



//// server connnection

app.listen(8080,()=>{
    console.log("server is working");
})

//// App Setting 

app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));


/////  express-session

let sessionOption=({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        expires:Date.now() + 2*24*60*60*1000,
        maxAge:2*24*60*60*1000,
        httpOnly: true,
    }
});
///// use of session package & flash message

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next();
})

//// Routes 

app.use("/",listingsrouter);
app.use("/",reviewsrouter);
app.use("/",userrouter);



//// fake user

app.get("/demoeuser",async (req,res)=>{
    let fakeuser =new User({
        email:"student@gmail.com",
        username:"delta-students"
  })
    let registeruser=await User.register(fakeuser,"wordpass@12345");
    res.send(registeruser)
 })

// // Error handling middleware.


app.use((err, req, res, next) => {
    const { statuscode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statuscode).render("error.ejs", { err });
});

