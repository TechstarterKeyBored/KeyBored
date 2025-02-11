const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require("./profile");
const authMiddleware = require("./middleware/auth");

router.get('/profile', authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile)

module.exports = router;