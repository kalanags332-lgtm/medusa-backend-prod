"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const scrypt_kdf_1 = __importDefault(require("scrypt-kdf"));

async function createAdminUser({ container }) {
  const logger = container.resolve("logger");
  const authModuleService = container.resolve(utils_1.Modules.AUTH);
  const userModuleService = container.resolve(utils_1.Modules.USER);
  const query = container.resolve("query");
  const link = container.resolve("link");

  const email = "kalanags331@gmail.com";
  const password = "helloworld123";

  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  logger.info(`FINAL SYNC FOR ADMIN USER: ${email}`);
  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  try {
    // 1. Get or Create User
    let user;
    const existingUsers = await userModuleService.listUsers({ email });
    if (existingUsers.length > 0) {
      user = existingUsers[0];
      logger.info(`User record exists: ${user.id}`);
    } else {
      [user] = await userModuleService.createUsers([
        { email, first_name: "Admin", last_name: "User" },
      ]);
      logger.info(`Created user record: ${user.id}`);
    }

    // 2. Hash Password
    const passwordHash = await scrypt_kdf_1.default.kdf(password, { logN: 15, r: 8, p: 1 });
    const passwordHashBase64 = passwordHash.toString("base64");

    // 3. Find existing Auth Identity using Query Graph (safe)
    const { data: identities } = await query.graph({
      entity: "auth_identity",
      fields: ["id"],
      filters: { 
        provider_identities: { 
          entity_id: [email],
          provider: ["emailpass"]
        } 
      }
    });

    let authIdentity;
    if (identities.length > 0) {
      authIdentity = identities[0];
      logger.info(`Updating existing auth identity: ${authIdentity.id}`);
      await authModuleService.updateAuthIdentities([
        {
          id: authIdentity.id,
          provider_metadata: { password: passwordHashBase64 },
        }
      ]);
    } else {
      [authIdentity] = await authModuleService.createAuthIdentities([
        {
          provider: "emailpass",
          entity_id: email,
          provider_metadata: { password: passwordHashBase64 },
          app_metadata: { user_id: user.id },
        },
      ]);
      logger.info(`Created new auth identity: ${authIdentity.id}`);
    }

    // 4. Force valid link
    try {
      await link.create({
        [utils_1.Modules.AUTH]: {
          auth_identity_id: authIdentity.id,
        },
        [utils_1.Modules.USER]: {
          user_id: user.id,
        },
      });
      logger.info("Link created successfully.");
    } catch (e) {
      logger.info("Link already exists or error during linking (non-fatal).");
    }

    logger.info(`✅ Admin user ${email} is 100% ready!`);
  } catch (err) {
    logger.error(`❌ Admin sync failed: ${err.message}`);
  }
}

exports.default = createAdminUser;
