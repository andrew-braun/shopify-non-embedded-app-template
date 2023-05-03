import Shopify from "@lib/shopify"
import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	const shop = req.query.shop

	if (!shop) {
		res.redirect("/login")
	}

	const authRoute = await Shopify.auth.begin({
		rawRequest: req,
		rawResponse: res,
		shop: shop,
		callbackPath: "/api/auth/offline-callback",
		isOnline: false,
	})

	// res.redirect(authRoute)
}
