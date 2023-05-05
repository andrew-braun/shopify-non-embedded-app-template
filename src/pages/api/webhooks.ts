import Shopify from "@lib/shopify"
import CustomSessionStorage from "@lib/sessionStorage/redisSessionStorage"
import { transformToRawBody } from "@lib/utils/micro"

import { buffer } from "micro"
import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	console.log("Incoming Webhook")
	if (req.method === "POST") {
		try {
			const rawBody = await transformToRawBody(req)

			await Shopify.webhooks.process({
				rawBody: rawBody,
				rawRequest: req,
				rawResponse: res,
			})
			console.log(`Webhook processed, returned status code 200`)
		} catch (error) {
			console.log(`Failed to process webhook: ${error}`)
		}
	} else {
		res.status(403).send("Only POST is allowed")
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
}
