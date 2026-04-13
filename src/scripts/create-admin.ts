import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function createAdminUser({ container }: ExecArgs) {
  const authModuleService = container.resolve(Modules.AUTH);
  const userModuleService = container.resolve(Modules.USER);

  const email = "kalanags331@gmail.com";
  const password = "helloworld123";

  try {
    // Check if user already exists
    const existingUsers = await userModuleService.listUsers({ email });
    if (existingUsers.length > 0) {
      console.log(`Admin user ${email} already exists. Skipping creation.`);
      return;
    }

    // Create the user record
    const [user] = await userModuleService.createUsers([
      { email, first_name: "Admin", last_name: "User" },
    ]);

    // Register the password auth identity
    await authModuleService.createAuthIdentities([
      {
        provider: "emailpass",
        entity_id: email,
        provider_metadata: { password },
        app_metadata: { user_id: user.id },
        user_metadata: {},
      },
    ]);

    console.log(`✅ Admin user ${email} created successfully!`);
  } catch (err) {
    console.error("❌ Failed to create admin user:", err.message);
  }
}
