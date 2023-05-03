import "@shopify/shopify-api/adapters/node"
import { shopifyApi, ApiVersion, BillingInterval } from "@shopify/shopify-api"
import { restResources } from "@shopify/shopify-api/rest/admin/2022-07"

// import SessionStorage from "./sessionStorage"
// import webhooks from "../webhooks"

const Shopify = shopifyApi({
	apiKey: process.env.SHOPIFY_API_KEY,
	apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
	scopes: process.env.SCOPES.split(","),
	hostName: process.env.HOST.replace(/https:\/\//, ""),
	hostScheme: "https",
	apiVersion: ApiVersion.July22,
	isEmbeddedApp: false,
	restResources,
})

// Shopify.webhooks.addHandlers(webhooks)

export default Shopify
