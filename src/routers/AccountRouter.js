const { Router } = require("express");

const { asyncHandler } = require("../helper/asyncHandler");
const {
    LoginController,
    RegisterController,
} = require("../controllers/AccountController");

const router = Router();

router.route("/login").post(asyncHandler(LoginController));
router.route("/register").post(asyncHandler(RegisterController));

module.exports = router;
