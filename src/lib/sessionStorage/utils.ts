import { ApiRequest, NextApiResponse } from "@types"
import CustomSessionStorage from "@lib/redisSessionStorage"
import Shopify from "@lib/shopify"

export async function loadSessionFromReq(
	req: ApiRequest,
	res: NextApiResponse
) {
	const sessionId = await Shopify.session.getCurrentId({
		isOnline: true,
		rawRequest: req,
		rawResponse: res,
	})
	const session = await CustomSessionStorage.loadSession(req.body.sessionId)

	return session
}
