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

  const email = "kalanags331@gmail.com";
  const password = "helloworld123";

  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  logger.info(`STARTING ADMIN CREATION SCRIPT FOR: ${email}`);
  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  try {
    const existingUsers = await userModuleService.listUsers({ email });
    if (existingUsers.length > 0) {
      logger.info(`Admin user ${email} already exists. Skipping creation.`);
      return;
    }

    const passwordHash = await scrypt_kdf_1.default.kdf(password, { logN: 15, r: 8, p: 1 });
    const passwordHashBase64 = passwordHash.toString("base64");

    const [user] = await userModuleService.createUsers([
      { email, first_name: "Admin", last_name: "User" },
    ]);

    await authModuleService.createAuthIdentities([
      {
        provider: "emailpass",
        entity_id: email,
        provider_metadata: { password: passwordHashBase64 },
        app_metadata: { user_id: user.id },
        user_metadata: {},
      },
    ]);

    logger.info(`✅ Admin user ${email} created successfully!`);
  } catch (err) {
    logger.error(`❌ Failed to create admin user: ${err.message}`);
  }
}

exports.default = createAdminUser;
