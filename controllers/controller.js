
const Listing = require("../models/listing")

module.exports.index =async(req,res) => {
    let initdata = await Listing.find({});
    res.render("listings/index.ejs", { initdata });
};

module.exports.form=async(req, res) => {
    res.render("listings/new.ejs");
};

module.exports.savelistings= async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    let newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id; 
    req.flash("success", "New listing created");
    newlisting.image = {url ,filename}
    newlisting.save();
    res.redirect("/listings");
};

module.exports.showlistings= async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate("Reviews");
    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });
};

module.exports.editlisting = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};



module.exports.updatelisting = async(req, res) => {
    let { id } = req.params;
    let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!="undefine"){
        let url=req.file.path;
        let filename=req.file.filename;
    listing.image = {url, filename}
    await listing.save() ;
    }
    req.flash("success", "Listing updated");
    res.redirect("/listings");
};
module.exports.deletlisting = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};