import Shopify from "@lib/shopify"
import { ApiRequest, NextApiResponse } from "@types"
import { loadSessionFromReq } from "@lib/sessionStorage/utils"
import { transformToRawBody } from "@lib/utils/micro"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	console.log("Incoming Webhook")
	if (req.method === "POST") {
		try {
			const session = await loadSessionFromReq(req, res)
			const rawBody = await transformToRawBody(req)

			await Shopify.webhooks.process({
				rawBody,
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
