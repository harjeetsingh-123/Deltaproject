
const express = require('express');
const router = express.Router();
const WrapeAsync = require("../utils/wrapeAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const { reviewSchema } = require("../joi.js");


const validationreview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};


router.post("/listings/:id/review", validationreview, WrapeAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newreview = new Review(req.body.review);
    listing.Reviews.push(newreview);
    await newreview.save();
    await listing.save()
    req.flash("success","Review added")
    res.redirect(`/listings/${id}`);
}));

router.delete("/listings/:id/Reviews/:reviewId", WrapeAsync(async (req, res) => {
    let { id, reviewId } = req.params;
     await Review.findByIdAndDelete(reviewId);
     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
     req.flash("success","Review Deleted")
     res.redirect(`/listings/${id}`);
}));

module.exports = router;