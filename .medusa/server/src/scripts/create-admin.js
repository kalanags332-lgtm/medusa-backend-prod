"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_flows_1 = require("@medusajs/medusa/core-flows");

async function createAdminUser({ container }) {
  const logger = container.resolve("logger");
  const userModuleService = container.resolve("user");

  const email = "kalanags331@gmail.com";
  const password = "helloworld123";

  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  logger.info(`🚀 WORKFLOW SYNC FOR ADMIN USER: ${email}`);
  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  try {
    // 1. Clean up existing users to avoid conflicts
    const existingUsers = await userModuleService.listUsers({ email });
    if (existingUsers.length > 0) {
      logger.info(`Removing existing user to ensure clean workflow run...`);
      await userModuleService.deleteUsers(existingUsers.map(u => u.id));
    }

    // 2. Use the official Medusa Workflow to create the user account
    // This workflow handles User, AuthIdentity, and the Link between them correctly.
    const { result } = await (0, core_flows_1.createUserAccountWorkflow)(container).run({
      input: {
        email,
        password,
        actor_type: "user", // In Medusa V2, admin users are 'user' actors
        auth_provider_id: "emailpass",
        userData: {
          first_name: "Admin",
          last_name: "User",
        }
      }
    });

    logger.info(`✅ Admin user ${email} created successfully via Workflow!`);
  } catch (err) {
    logger.error(`❌ Workflow sync failed: ${err.message}`);
    
    // If workflow fails, fall back to the CLI command as a last resort
    logger.info("Falling back to CLI command...");
    const { execSync } = require("child_process");
    try {
      execSync(`npx medusa user -e ${email} -p ${password}`, { stdio: 'inherit' });
      logger.info("✅ Admin user created via CLI fallback!");
    } catch (cliErr) {
      logger.error(`❌ CLI fallback also failed: ${cliErr.message}`);
    }
  }
}

exports.default = createAdminUser;
