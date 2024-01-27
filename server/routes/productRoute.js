const path = require("path")
const express = require("express")
const {  productImgResize, uploadMiddleware } = require("../middlewares/uploadImages")
const { isAdmin, authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const router = express.Router()
const { 
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImages
 } = require(path.join(__dirname, "..", "controllers", "productCtrl.js"))
 router.put("/wishlist", authMiddleware,  addToWishlist)
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.put("/upload/:id", authMiddleware, isAdmin, uploadMiddleware, productImgResize, uploadImages)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)
router.get("/", getAllProduct)
router.get("/:id",getaProduct)
module.exports = router