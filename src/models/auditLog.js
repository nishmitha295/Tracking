const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userEmail: { type: String, required: true },
  userName: { type: String },

  module: { type: String, required: true },    // Campaign / Rewards / Coupons
  action: { type: String, required: true },    // CREATE / UPDATE

  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },

  changedFields: [
    {
      field: String,
      oldValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed,
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
