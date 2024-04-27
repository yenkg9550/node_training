var express = require("express");
var router = express.Router();
const Post = require("../models/postsModel");
const User = require("../models/usersModel");

const PostController = require('../controllers/post.js');

router.get("/", PostController.getPosts)

router.post("/", PostController.createPost)

router.patch('/:id', PostController.editPost);

router.delete("/", PostController.deleteAllPosts)

router.delete("/:id", PostController.deletePost)

module.exports = router;
