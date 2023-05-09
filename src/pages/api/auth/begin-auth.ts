import { ApiRequest, NextApiResponse } from "@types"

export default async function handler(req: ApiRequest, res: NextApiResponse) {
	/* In development, initiating the OAuth flow from localhost sets the cookie
	 ** only on localhost, so it's lost when the ngrok URL is activated.
	 ** This simply makes sure the cookie isn't set until the actual host url
	 ** is the active one.
	 */
	const shop = req.query.shop

	res.redirect(`${process.env.HOST}/api/auth/offline?shop=${shop}`)
}
