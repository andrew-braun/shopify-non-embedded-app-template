import { DeliveryMethod } from "@shopify/shopify-api"

const webhooks = {
	APP_UNINSTALLED: {
		deliveryMethod: DeliveryMethod.Http,
		callbackUrl: "/api/webhooks/app-uninstall",
		callback: async (topic, shop, body) => {
			console.log("App uninstalled")
		},
	},
}

export default webhooks
