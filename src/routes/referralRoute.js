const express = require("express");
const router = express.Router();
const referralController = require("../controller/referralController");

router.post("/referrals", referralController.saveReferral);

router.get("/referrals", referralController.getAllReferrals);
module.exports = router;

