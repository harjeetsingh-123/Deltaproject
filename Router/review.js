
const express = require('express');
const router = express.Router();
const WrapeAsync = require("../utils/wrapeAsync.js");
const {validationreview}=require("../middleware.js")

const reviewcontroller=require("../controllers/review.js")

router.post("/:id/review", validationreview, WrapeAsync(reviewcontroller.createreview));

router.delete("/:id/Reviews/:reviewId",WrapeAsync(reviewcontroller.destoryroute));

module.exports = router;