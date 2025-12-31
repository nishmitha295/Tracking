const Campaign = require("../models/Campaign");
const AuditLog = require("../models/auditLog");
const CampaignHistory = require("../models/CampaignHistory");


exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);

     // Save Campaign History
    await CampaignHistory.create({
      campaignId: campaign._id,
      adminId: req.user.id,
      adminName: req.user.name,
      action: "CREATE",
      changedFields: []
    });

    // Log Audit
    await AuditLog.create({
      userId: req.user.id,
      userEmail: req.user.email,
      userName: req.user.name,
      module: "Campaign",
      action: "CREATE",
      campaignId: campaign._id,
      changedFields: []
    });

    res.status(200).json({
      success: true,
      message: "Campaign Created Successfully",
      data: campaign
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;

    const oldData = await Campaign.findById(campaignId);
    if (!oldData) {
      return res.status(404).json({ message: "Campaign Not Found" });
    }

    await Campaign.updateOne({ _id: campaignId }, req.body);

    // Detect Changed Fields
    let changes = [];
    Object.keys(req.body).forEach(key => {
      if (req.body[key] != oldData[key]) {
        changes.push({
          field: key,
          oldValue: oldData[key],
          newValue: req.body[key]
        });
      }
    });

    // Save only if something actually changed
    if (changes.length > 0) {

      // Save Campaign History
      await CampaignHistory.create({
        campaignId,
        adminId: req.user.id,
        adminName: req.user.name,
        action: "UPDATE",
        changedFields: changes
      });

      await AuditLog.create({
        userId: req.user.id,
        userEmail: req.user.email,
        userName: req.user.name,
        module: "Campaign",
        action: "UPDATE",
        campaignId,
        changedFields: changes
      });
    }

    res.status(200).json({
      success: true,
      message: "Campaign Updated & Audit Logged"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCampaignHistory = async (req, res) => {
  try {
    const history = await AuditLog.find({
      campaignId: req.params.id
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
