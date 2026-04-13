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
  logger.info(`🔥 DESTRUCTIVE SYNC FOR ADMIN USER: ${email}`);
  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  try {
    // 1. DELETE EVERYTHING RELATED TO THIS EMAIL FIRST (CLEAN SLATE)
    
    // Find all identities for this email
    const { data: identities } = await query.graph({
      entity: "auth_identity",
      fields: ["id"],
      filters: { 
        provider_identities: { 
          entity_id: [email]
        } 
      }
    });

    if (identities.length > 0) {
      logger.info(`Removing ${identities.length} old auth identities...`);
      await authModuleService.deleteAuthIdentities(identities.map(i => i.id));
    }

    // Find and delete the user
    const existingUsers = await userModuleService.listUsers({ email });
    if (existingUsers.length > 0) {
      logger.info(`Removing existing user: ${existingUsers[0].id}`);
      await userModuleService.deleteUsers(existingUsers.map(u => u.id));
    }

    // 2. CREATE FRESH
    const [user] = await userModuleService.createUsers([
      { email, first_name: "Admin", last_name: "User" },
    ]);
    logger.info(`Created fresh user record: ${user.id}`);

    const passwordHash = await scrypt_kdf_1.default.kdf(password, { logN: 15, r: 8, p: 1 });
    const passwordHashBase64 = passwordHash.toString("base64");

    const [authIdentity] = await authModuleService.createAuthIdentities([
      {
        provider: "emailpass",
        entity_id: email,
        provider_metadata: { password: passwordHashBase64 },
        app_metadata: { user_id: user.id },
      },
    ]);
    logger.info(`Created fresh auth identity: ${authIdentity.id}`);

    // 3. LINK THEM
    await link.create({
      [utils_1.Modules.AUTH]: {
        auth_identity_id: authIdentity.id,
      },
      [utils_1.Modules.USER]: {
        user_id: user.id,
      },
    });

    logger.info(`✅ Admin user ${email} is FRESHLY SYNCED AND READY!`);
  } catch (err) {
    logger.error(`❌ Destructive sync failed: ${err.message}`);
  }
}

exports.default = createAdminUser;
