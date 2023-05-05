import Shopify from "@lib/shopify"

import CustomSessionStorage from "@lib/redisSessionStorage"
import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	try {
		const callbackResponse = await Shopify.auth.callback({
			rawRequest: req,
			rawResponse: res,
		})
		console.log("Shopify auth callback called")

		const storedSession = await CustomSessionStorage.storeSession(
			callbackResponse.session
		)

		// const webhooks = await Shopify.Webhooks.Registry.registerAll({
		// 	shop: session.shop,
		// 	accessToken: session.accessToken,
		// })

		// Object.keys(webhooks).forEach((webhook) => {
		// 	if (webhooks[webhook].success === true) {
		// 		console.log(`Registered ${webhook} webhook`)
		// 	} else {
		// 		console.log(`Failed to register ${webhook} webhook: ${webhooks.result}`)
		// 	}
		// })
	} catch (error) {
		console.log(error)
	}

	res.redirect(`/app?host=${req.query.host}&shop=${req.query.shop}`)
}
