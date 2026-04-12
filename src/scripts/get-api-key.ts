import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function getPublishableKey({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

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

  data.forEach((key: any) => {
    console.log(`\n✅ Publishable API Key Found:`);
    console.log(`   Title: ${key.title}`);
    console.log(`   Token: ${key.token}`);
  });
}
