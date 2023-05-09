import { ApiRequest, NextApiResponse } from "@types"
import CustomSessionStorage from "@lib/sessionStorage/redisSessionStorage"
import Shopify from "@lib/shopify"

// This function is used to load the session from an API request
export async function loadSessionFromReq(
	req: ApiRequest,
	res: NextApiResponse
) {
	const sessionId = await Shopify.session.getCurrentId({
		isOnline: true,
		rawRequest: req,
		rawResponse: res,
	})
	const session = await CustomSessionStorage.loadSession(sessionId)

	return session
}
