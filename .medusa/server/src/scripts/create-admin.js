"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createAdminUser;
const utils_1 = require("@medusajs/framework/utils");
async function createAdminUser({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const userService = container.resolve(utils_1.Modules.USER);
    const authService = container.resolve(utils_1.Modules.AUTH);
    const email = "admin@medusa-test.com";
    const password = "supersecret";
    const provider = "emailpass";
    logger.info(`Attempting to create admin user: ${email}...`);
    try {
        // 1. Create the user profile
        const user = await userService.createUsers({ email });
        // 2. Register the auth identity with the password
        const { authIdentity, error } = await authService.register(provider, {
            body: {
                email,
                password,
            },
        });
        if (error) {
            throw new Error(error);
        }
        // 3. Link the user to the auth identity
        await authService.updateAuthIdentities({
            id: authIdentity.id,
            app_metadata: {
                user_id: user.id,
            },
        });
        logger.info(`User ${email} created successfully.`);
    }
    catch (error) {
        if (error.message?.includes("already exists") || error.code === "23505" || error.message?.includes("Duplicate")) {
            logger.warn(`User ${email} already exists or identity already registered. Skipping.`);
        }
        else {
            logger.error(`Error creating user: ${error.message}`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWFkbWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvY3JlYXRlLWFkbWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0NBMkNDO0FBN0NELHFEQUE4RTtBQUUvRCxLQUFLLFVBQVUsZUFBZSxDQUFDLEVBQUUsU0FBUyxFQUFZO0lBQ25FLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEUsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkQsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFbkQsTUFBTSxLQUFLLEdBQUcsdUJBQXVCLENBQUE7SUFDckMsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFBO0lBQzlCLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQTtJQUU1QixNQUFNLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxLQUFLLEtBQUssQ0FBQyxDQUFBO0lBRTNELElBQUksQ0FBQztRQUNILDZCQUE2QjtRQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBRXJELGtEQUFrRDtRQUNsRCxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU8sV0FBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzVFLElBQUksRUFBRTtnQkFDSixLQUFLO2dCQUNMLFFBQVE7YUFDVDtTQUNGLENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3hCLENBQUM7UUFFRCx3Q0FBd0M7UUFDeEMsTUFBTyxXQUFtQixDQUFDLG9CQUFvQixDQUFDO1lBQzlDLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUNuQixZQUFZLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssd0JBQXdCLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUMvRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSywyREFBMkQsQ0FBQyxDQUFBO1FBQ3hGLENBQUM7YUFBTSxDQUFDO1lBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDeEQsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIn0=