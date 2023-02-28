const express= require("express");
const { browse_classifieds, post_classification, DeletePost } = require("../controller/post.controller");
const router= express.Router();

router.route("/post").post(post_classification)
router.route("/browse").get(browse_classifieds)
router.route("/post").delete(DeletePost);

module.exports=router