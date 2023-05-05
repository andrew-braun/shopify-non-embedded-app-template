import Shopify from "@lib/shopify"
import { ApiRequest, NextApiResponse } from "@types"
import { loadSessionFromReq } from "@lib/sessionStorage/utils"
import { transformToRawBody } from "@lib/utils/requests"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	try {
		const session = await loadSessionFromReq(req, res)
		const rawBody = await transformToRawBody(req)

		const response = await Shopify.clients.graphqlProxy({ session, rawBody })

		res.status(200).send(response.body)
	} catch (err) {
		console.error(err)
		res.status(500).send(err.message)
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
}
