if(process.env.NODE_EVE!="production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const path=require("path"); 
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const ejsmate = require('ejs-mate');
const Review = require('./models/review.js');
const listingsrouter=require("./Router/listings.js")
const reviewsrouter= require("./Router/review.js");
const userrouter= require("./Router/user.js");
const  flash = require('connect-flash');
const  session = require('express-session')
const MongoStore = require('connect-mongo');
const passport=require("passport");
const LocalStrategy=require("passport-local")
const User = require('./models/user.js');




//// database connection 


const dbbUrl= process.env.ATLAS_URL;

    async function main() {
        mongoose.connect(dbbUrl);
    };

main()
.then((res)=>{
    console.log("connection success !")
})
.catch((err)=>{
    console.log("some Error occureed !" )
})







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



////// mongo -session 

let store= MongoStore.create({
    mongoUrl:dbbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter:24*3600

})

store.on("error",()=>{
    console.log("some error on mongo store",err);

})
/////  express-session

let sessionOption=({
    store,
    secret: process.env.SECRET,
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
    res.locals.curentUser=req.user
    next();
})

//// Routes 

app.use("/listings",listingsrouter);
app.use("/listings",reviewsrouter);
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

