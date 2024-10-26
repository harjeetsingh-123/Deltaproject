const express = require('express');
const router = express.Router({ mergeParams: true });
const WrapeAsync = require("../utils/wrapeAsync.js");
const {isAuthenticated,validationListing  }=require("../middleware.js");
const Listing = require("../models/listing");
const Listingscontroller =require("../controllers/controller.js");
const {storage}=require("../clodinaryconfig.js");
const multer  = require('multer');
const upload = multer({ storage });


// Index route
router.get("/", WrapeAsync(Listingscontroller.index)); 

// New listing form route
router.get("/new",isAuthenticated,(Listingscontroller.form));

// Save listings

router.post("/",isAuthenticated,upload.single("listing[image]"),WrapeAsync(Listingscontroller.savelistings));
// Show listing

router.get("/:id",isAuthenticated, WrapeAsync(Listingscontroller.showlistings));

// Edit listing route
router.get("/:id/edit",isAuthenticated , WrapeAsync(Listingscontroller.editlisting));

// Update listings
router.put("/:id", isAuthenticated, upload.single("listing[image]") ,WrapeAsync(Listingscontroller.updatelisting));

// Delete route
router.delete("/:id",isAuthenticated, WrapeAsync(Listingscontroller.deletlisting));

module.exports =router ;