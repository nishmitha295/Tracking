const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const campaignController = require("../controllers/campaignController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/create", campaignController.createCampaign);
router.put("/update/:id", campaignController.updateCampaign);
router.get("/history/:id", campaignController.getCampaignHistory);

module.exports = router;
