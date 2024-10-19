// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const WrapeAsync = require("../utils/wrapeAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../joi.js");
// const Listing = require("../models/listing.js");


// const validationListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body.listing);
//     if (error) {
//         throw new ExpressError(404, error);
//     } else {
//         next();
//     }
// };
// ///// index route 

// router.get("/listings", WrapeAsync(async (req, res) => {
//     let initdata = await Listing.find({});
//     res.render("listings/index.ejs", { initdata });
// }));


// // // New listing form route 

// router.get("/listings/new", (req, res) =>{
//     if(!req.isAuthenticated()){
//         req.flash("error","you must logged to create listing");
//        res.redirect("/login");
//     }     
//        res.render("listings/new.ejs");
    
//  });



// ///// save listings 

// router.post("/listings",WrapeAsync(async (req, res) => {
//     let newlisting = new Listing(req.body.listing);
//     req.flash("success","New listing created")
//     await newlisting.save();
//     res.redirect("/listings");
// }));

// //// show listing 

// router.get("/listings/:id", WrapeAsync(async (req, res) => {
//     let { id } = req.params;
//     let list = await Listing.findById(id).populate("Reviews");
//     if(!list) {
//         req.flash("error","listing not exists..!")
//         res.redirect("/listings")
//     }
//     res.render("listings/show.ejs", { list });
// }));




// ///// Edit listing Route 

// router.get("/listings/:id/edit", WrapeAsync(async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     if(!listing) {
//         req.flash("error","listing not exists..!")
//         res.redirect("/listings")
//     }

//     res.render("listings/edit.ejs", { listing });
// }));


// //// Update listings 


// router.put("/listings/:id", WrapeAsync(async (req, res) => {
//     let { id } = req.params;
//     let p = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success","listing Updateed")
//     res.redirect("/listings");
// }));


// //// delete Route 

// router.delete("/listings/:id", WrapeAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndDelete(id);
//     req.flash("success","listing Deleted")
//     res.redirect("/listings");
// }));

const express = require('express');
const router = express.Router({ mergeParams: true });
const WrapeAsync = require("../utils/wrapeAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../joi.js");
const Listing = require("../models/listing.js");

const validationListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body.listing);
    if (error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};

// Index route
router.get("/listings", WrapeAsync(async (req, res) => {
    let initdata = await Listing.find({});
    res.render("listings/index.ejs", { initdata });
}));

// New listing form route
router.get("/listings/new", (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");
});

// Save listings
router.post("/listings", WrapeAsync(async (req, res) => {
    let newlisting = new Listing(req.body.listing);
    req.flash("success", "New listing created");
    await newlisting.save();
    res.redirect("/listings");
}));

// Show listing
router.get("/listings/:id", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate("Reviews");
    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });
}));

// Edit listing route
router.get("/listings/:id/edit", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update listings
router.put("/listings/:id", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing updated");
    res.redirect("/listings");
}));

// Delete route
router.delete("/listings/:id", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
}));



module.exports = router;