const db = require("../utils/database");

const Role = class Role {
  constructor(id, role, permission) {
    this.id = id;
    this.role = role;
    this.permission = permission;
  }

  static getRoleIdByRoleName(roleName) {
    return db.execute("SELECT * FROM ROLE WHERE role=?", [roleName]);
  }
};

module.exports = Role;
