const { Router } = require("express");

const HeatlthCheckController = require("../controllers/HeatlthCheckController");

const router = Router();

router.route("/").get(HeatlthCheckController);
router.route("/test").get(HeatlthCheckController);

module.exports = router;
