const user=require("../models/user.js");


module.exports.signupform=async (req,res)=>{
    res.render("../views/users/signup.ejs")
};


module.exports.signup= async(req,res)=>{
    try {
        let {username ,password ,email}=req.body;
        let newuser=new user({username, email});
        let registeruser=await user.register(newuser,password);
        req.login(registeruser,(err)=>{
            if (err){ 
                return next(err);
             }
             req.flash("success","Welcome to Wonderlust");
             res.redirect("/listings");
          });
    } catch (error) {
        req.flash("error",error.message)
        res.redirect("/signup")   
    }
};


module.exports.loginform=(req,res)=>{
    res.render("../views/users/login.ejs")
};


module.exports.loginaauthontication = async(req,res)=>{
    res.redirect("/listings")
        
    }     

    module.exports.logout=async (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                next (err);
            };
            req.flash("success","you are logged out...!");
            res.redirect("/listings");
        });
    
        }