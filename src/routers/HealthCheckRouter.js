const { Router } = require("express");

const { asyncHandler } = require("../helper/asyncHandler");
const HeatlthCheckController = require("../controllers/HeatlthCheckController");

const router = Router();

router.route("/").get(asyncHandler(HeatlthCheckController));
router.route("/test").get(asyncHandler(HeatlthCheckController));

module.exports = router;
