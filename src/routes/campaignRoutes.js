const express = require("express");
const router = express.Router();

const {
  createCampaign,
  updateCampaign,
  getCampaignHistory
} = require("../controllers/campaignController");

// Create Campaign
router.post("/", createCampaign);

// Update Campaign
router.put("/:id", updateCampaign);

// Get Campaign History
router.get("/:id/history", getCampaignHistory);

module.exports = router;
