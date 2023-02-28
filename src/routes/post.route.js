const express= require("express");
const { browse_classifieds, post_classification } = require("../controller/post.controller");
const router= express.Router();

router.route("/post").post(post_classification)
router.route("/browse").get(browse_classifieds)

module.exports=router