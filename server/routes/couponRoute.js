const express = require("express")
const router = express.Router()
const path = require("path")
const { authMiddleware, isAdmin } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { 
    createCoupon,
    getAllCoupon,
    updateCoupon,
deleteCoupon } = require(path.join(__dirname, "..", "controllers", "couponCtrl.js"))
router.post("/", authMiddleware, isAdmin,  createCoupon)
router.get("/", authMiddleware, isAdmin,  getAllCoupon)
router.put("/:id", authMiddleware, isAdmin,  updateCoupon)
router.delete("/:id", authMiddleware, isAdmin,  deleteCoupon)
module.exports = router