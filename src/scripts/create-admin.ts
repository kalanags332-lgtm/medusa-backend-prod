import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function createAdminUser({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const userService = container.resolve(Modules.USER)
  const authService = container.resolve(Modules.AUTH)
  
  const email = "admin@medusa-test.com"
  const password = "supersecret"
  const provider = "emailpass"

  logger.info(`Attempting to create admin user: ${email}...`)

  try {
    // 1. Create the user profile
    const user = await userService.createUsers({ email })
    
    // 2. Register the auth identity with the password
    const { authIdentity, error } = await (authService as any).register(provider, {
      body: {
        email,
        password,
      },
    })

    if (error) {
      throw new Error(error)
    }

    // 3. Link the user to the auth identity
    await (authService as any).updateAuthIdentities({
      id: authIdentity.id,
      app_metadata: {
        user_id: user.id,
      },
    })

    logger.info(`User ${email} created successfully.`)
  } catch (error: any) {
    if (error.message?.includes("already exists") || error.code === "23505" || error.message?.includes("Duplicate")) {
       logger.warn(`User ${email} already exists or identity already registered. Skipping.`)
    } else {
       logger.error(`Error creating user: ${error.message}`)
    }
  }
}
