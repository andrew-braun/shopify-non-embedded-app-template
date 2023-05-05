import Shopify from "@lib/shopify"

import CustomSessionStorage from "@lib/sessionStorage/redisSessionStorage"
import { ApiRequest, NextApiResponse } from "@types"
import { Session } from "@shopify/shopify-api"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	try {
		const callbackResponse = await Shopify.auth.callback({
			rawRequest: req,
			rawResponse: res,
		})
		const session = new Session(callbackResponse.session)

		console.log("Shopify auth callback complete")

		const storedSession = await CustomSessionStorage.storeSession(
			callbackResponse.session
		)

		const webhooks = await Shopify.webhooks.register({
			session,
		})

		Object.keys(webhooks).forEach((topic) => {
			webhooks[topic].forEach((webhook) => {
				if (webhook.success === true) {
					console.log(`Registered ${topic} webhook`)
				} else {
					console.log(`Failed to register ${topic} webhook: ${webhook.result}`)
				}
			})
		})
	} catch (error) {
		console.log(error)
	}

	res.redirect(`/app?host=${req.query.host}&shop=${req.query.shop}`)
}
