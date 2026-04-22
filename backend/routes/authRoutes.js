const express = require("express");
const router = express.Router();
const {
    register,
    login,
    updatePassword,
    updateCourse
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/update-password", protect, updatePassword);
router.put("/update-course", protect, updateCourse);

module.exports = router;