const path = require("path")
const express = require("express")
const { localVariables } = require("../middlewares/authMiddleware")
const { authMiddleware, isAdmin } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const {
      createUser,
      loginUser,
      getAllUsers,
      getAUser,
      deleteAUser,
      updateAUser,
      blockUser,
      unblockUser,
      handleRefreshToken,
      logout,
      updatePassword,
      forgotPasswordToken,
      resetPassword,
      loginAdmin,
      getWishList,
      saveAddress,
      userCart,
      getUserCart,
      emptyCart,
      applyCoupon,
      createOrder,
      getOrders,
      updateOrderStatus,
      generateOTP,
      verifyOTP,
      createResetSession,
      otpResetPassword,
      verifyUser
    } = require(path.join(__dirname, "..", "controllers", "userCtrl.js"))
const router = express.Router()
router.post("/register", createUser)
router.post("/forgot-password-token", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus)
router.put("/password", authMiddleware, updatePassword)
router.post("/login", loginUser)
router.post("/admin-login", loginAdmin)
router.post("/cart",  authMiddleware, userCart)
router.post("/cart/applycoupon",  authMiddleware, applyCoupon)
router.post("/cart/cash-order",  authMiddleware, createOrder)
router.get("/refresh", handleRefreshToken)
router.get("/all-users", getAllUsers)
router.get("/get-orders", authMiddleware, getOrders)
router.get("/logout", logout)
router.get("/generateOTP", verifyUser, localVariables,  generateOTP)
router.get("/verifyOTP", verifyOTP)
router.get("/createResetSession", createResetSession)

router.delete("/empty-cart", authMiddleware, emptyCart)
router.delete("/:id", deleteAUser)
router.get("/cart",  authMiddleware, getUserCart)
router.get("/wishlist", authMiddleware,   getWishList)
router.get("/:id", authMiddleware, isAdmin,  getAUser)
router.put("/edit-user", authMiddleware, updateAUser)
router.put("/save-address", authMiddleware, saveAddress)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)
router.put("/otpResetPassword", verifyUser, otpResetPassword)
module.exports = router