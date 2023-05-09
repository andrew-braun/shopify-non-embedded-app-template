import "@shopify/shopify-api/adapters/node"
import { shopifyApi, ApiVersion } from "@shopify/shopify-api"
import { restResources } from "@shopify/shopify-api/rest/admin/2022-07"

import webhooks from "../webhooks"

/* Initiate the Shopify object that will be used to access methods
 ** throughout the rest of the app
 */
const Shopify = shopifyApi({
	apiKey: process.env.SHOPIFY_API_KEY,
	apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
	scopes: process.env.SCOPES.split(","),
	hostName: process.env.HOST.replace(/https:\/\//, ""),
	hostScheme: "https",
	apiVersion: ApiVersion.April23,
	isEmbeddedApp: false,
	restResources,
})

// Register Shopify webhook handlers
Shopify.webhooks.addHandlers(webhooks)

export default Shopify
