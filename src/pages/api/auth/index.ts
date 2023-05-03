import Shopify from "@lib/shopify"
import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	const shop = req.query.shop

	if (!shop) {
		res.redirect("/login")
	}
	console.log(`Beginning auth for ${shop}`)

	const authRoute = await Shopify.auth.begin({
		rawRequest: req,
		rawResponse: res,
		shop: shop,
		callbackPath: "/api/auth/callback",
		isOnline: true,
	})
	console.log("authRoute: ", authRoute)

	// console.log("Redirecting to auth route: ", authRoute)
	// res.redirect(authRoute)
}
