const { listingSchema,reviewSchema } = require("./joi.js");
const ExpressError = require("./utils/ExpressError.js");
const listing=require("./models/listing.js")


module.exports.isAuthenticated =(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
};



module.exports.validationListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body.listing);
    if (error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};


module.exports.validationreview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};

