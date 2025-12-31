const AuditLog = require("../models/auditLog");

async function createAuditLog({
  module,
  action,
  entityId,
  entityName,
  changedFields,
  user
}) {
  await AuditLog.create({
    module,
    action,
    entityId,
    entityName,
    changedFields,
    doneBy: {
      userId: user.id,
      name: user.name,
      email: user.email
    }
  });
}

module.exports = createAuditLog;
