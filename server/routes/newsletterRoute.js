const path = require("path")
const express = require("express")
const router = express.Router()
const { createNewsletter } = require(path.join(__dirname, "..", "controllers", "newsletterCtrl"))
router.post("/", createNewsletter);
module.exports = router