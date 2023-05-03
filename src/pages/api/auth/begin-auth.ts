import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	const shop = req.query.shop
	console.log(shop)

	res.redirect(`${process.env.HOST}/api/auth/offline?shop=${shop}`)
}
