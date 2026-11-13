import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  product: ["create", "read", "update", "delete"],
  license: ["create", "read", "update", "delete", "activate", "deactivate"],
  order: ["create", "read", "update", "delete"],
  customer: ["create", "read", "update", "delete"],
  analytics: ["read"],
  settings: ["read", "update"],
} as const;

export const ac = createAccessControl(statement);

export const customer = ac.newRole({
  product: ["read"],
  license: ["read"],
  order: ["read"],
});

export const staff = ac.newRole({
  ...adminAc.statements,
  product: ["create", "read", "update", "delete"],
  license: ["create", "read", "update", "delete", "activate", "deactivate"],
  order: ["create", "read", "update", "delete"],
  customer: ["read", "update"],
  analytics: ["read"],
  settings: ["read"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  product: ["create", "read", "update", "delete"],
  license: ["create", "read", "update", "delete", "activate", "deactivate"],
  order: ["create", "read", "update", "delete"],
  customer: ["create", "read", "update", "delete"],
  analytics: ["read"],
  settings: ["read", "update"],
});

export const superAdmin = ac.newRole({
  ...adminAc.statements,
  user: [...adminAc.statements.user, "impersonate-admins"],
  product: ["create", "read", "update", "delete"],
  license: ["create", "read", "update", "delete", "activate", "deactivate"],
  order: ["create", "read", "update", "delete"],
  customer: ["create", "read", "update", "delete"],
  analytics: ["read"],
  settings: ["read", "update"],
});
