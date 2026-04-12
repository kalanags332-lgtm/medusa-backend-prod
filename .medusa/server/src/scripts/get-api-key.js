"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPublishableKey;
const utils_1 = require("@medusajs/framework/utils");
async function getPublishableKey({ container }) {
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data } = await query.graph({
        entity: "api_key",
        fields: ["id", "token", "title", "type"],
        filters: {
            type: "publishable",
        },
    });
    if (!data || data.length === 0) {
        console.log("❌ No publishable API key found. Run the seed script first.");
        return;
    }
    data.forEach((key) => {
        console.log(`\n✅ Publishable API Key Found:`);
        console.log(`   Title: ${key.title}`);
        console.log(`   Token: ${key.token}`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFwaS1rZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy9nZXQtYXBpLWtleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9DQXFCQztBQXZCRCxxREFBc0U7QUFFdkQsS0FBSyxVQUFVLGlCQUFpQixDQUFDLEVBQUUsU0FBUyxFQUFZO0lBQ3JFLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNqQyxNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7UUFDeEMsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLGFBQWE7U0FDcEI7S0FDRixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1FBQzFFLE9BQU87SUFDVCxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9