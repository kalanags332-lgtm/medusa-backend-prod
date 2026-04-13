import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import scrypt from "scrypt-kdf";

export default async function createAdminUser({ container }: ExecArgs) {
  const authModuleService = container.resolve(Modules.AUTH);
  const userModuleService = container.resolve(Modules.USER);

  const email = "kalanags331@gmail.com";
  const password = "helloworld123";

  console.log(`Creating admin user: ${email}`);

  try {
    // Check if user already exists
    const existingUsers = await userModuleService.listUsers({ email });
    if (existingUsers.length > 0) {
      console.log(`Admin user ${email} already exists. Skipping creation.`);
      return;
    }

    // Hash password exactly as emailpass provider does
    const passwordHash = await scrypt.kdf(password, { logN: 15, r: 8, p: 1 });
    const passwordHashBase64 = passwordHash.toString("base64");

    // Create the user record
    const [user] = await userModuleService.createUsers([
      { email, first_name: "Admin", last_name: "User" },
    ]);

    console.log(`User record created: ${user.id}`);

    // Create auth identity with correctly hashed password
    await authModuleService.createAuthIdentities([
      {
        provider: "emailpass",
        entity_id: email,
        provider_metadata: { password: passwordHashBase64 },
        app_metadata: { user_id: user.id },
        user_metadata: {},
      },
    ]);

    console.log(`✅ Admin user ${email} created successfully!`);
  } catch (err) {
    console.error("❌ Failed to create admin user:", err.message);
  }
}
