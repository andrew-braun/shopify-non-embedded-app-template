import Shopify from "@lib/shopify"
import SessionStorage from "@lib/sessionStorage"
import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	console.log("Hit callback route")
	try {
		const callbackResponse = await Shopify.auth.callback({
			rawRequest: req,
			rawResponse: res,
		})
		console.log("Callback response: ", callbackResponse)

		const storedSession = SessionStorage.storeSession(callbackResponse.session)
		console.log("Stored session: ", storedSession)

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
