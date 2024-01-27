const path = require("path")
const express = require("express")
const router = express.Router()
const { uploadMiddleware, blogImgResize } = require("../middlewares/uploadImages")
const { isAdmin, authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { createBlog,
updateBlog,
getBlog,
getAllBlog,
deleteBlog,
likeBlog,
dislikeBlog,
uploadImages
         } = require(path.join(__dirname, "..", "controllers", "blogCtrl"))
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.put("/upload/:id", authMiddleware, isAdmin, uploadMiddleware, blogImgResize, uploadImages)
router.get("/:id",  getBlog);
router.get("/",  getAllBlog);
router.delete("/:id",  authMiddleware, isAdmin, deleteBlog);
module.exports = router
