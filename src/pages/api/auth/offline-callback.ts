import Shopify from "@lib/shopify"
import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	try {
		const session = await Shopify.auth.callback({
			rawRequest: req,
			rawResponse: res,
		})
	} catch (error) {
		console.log(error)
	}
	const redirectUrl = `${process.env.HOST}/api/auth/?host=${req.query.host}&shop=${req.query.shop}`

	res.redirect(redirectUrl)
}
