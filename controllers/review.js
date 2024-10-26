const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createreview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newreview = new Review(req.body.review);
    listing.Reviews.push(newreview);
    await newreview.save();
    await listing.save()
    req.flash("success","Review added")
    res.redirect(`/listings/${id}`);
};


module.exports.destoryroute = async (req, res) => {
     let { id, reviewId } = req.params;
     await Review.findByIdAndDelete(reviewId);
     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
     req.flash("success","Review Deleted")
     res.redirect(`/listings/${id}`);
};