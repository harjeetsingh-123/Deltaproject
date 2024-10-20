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
router.get("/", WrapeAsync(async (req, res) => {
    let initdata = await Listing.find({});
    res.render("listings/index.ejs", { initdata });
}));

// New listing form route
// router.get("/new", (req, res) => {
//     if (!req.isAuthenticated()) {
//         req.flash("error", "You must be logged in to create a listing");
//         return res.redirect("/login");
//     }
//     res.render("listings/new.ejs");
// });

router.get("/new", (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a listing");
        req.session.returnTo = req.originalUrl; // Store the original URL to redirect after login
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");
});
 

// Save listings
router.post("/", WrapeAsync(async (req, res) => {
    let newlisting = new Listing(req.body.listing);
    req.flash("success", "New listing created");
    await newlisting.save();
    res.redirect("/listings");
}));

// Show listing
router.get("/:id", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate("Reviews");
    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });
}));

// Edit listing route
router.get("/:id/edit", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update listings
router.put("/:id", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing updated");
    res.redirect("/listings");
}));

// Delete route
router.delete("/:id", WrapeAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
}));

module.exports = router;