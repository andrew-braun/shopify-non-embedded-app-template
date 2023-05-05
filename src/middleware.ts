import CustomSessionStorage from "@lib/redisSessionStorage"

import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest, res: NextResponse) {
	if (req.url.includes("/app") || req.url.includes("/graphql")) {
		const urlParams = new URLSearchParams(req.url.split("?")[1])

		const query = Object.fromEntries(urlParams)

		const { shop } = query
		const sessionId = req.cookies.get("shopify_app_session").value

		if (sessionId === undefined) {
			if (shop) {
				return NextResponse.redirect(
					`${process.env.HOST}/api/auth/offline?shop=${shop}`
				)
			}
			console.log("Redirect to login")
			return NextResponse.redirect(`${process.env.HOST}/login`)
		} else {
			const sessionResponse = await CustomSessionStorage.loadSession(sessionId)

			const session = sessionResponse

			if (session) {
				return NextResponse.next()
			} else {
				if (shop) {
					return NextResponse.redirect(
						`${process.env.HOST}/api/auth/offline?shop=${shop}`
					)
				} else {
					console.log("Redirect to login")
					return NextResponse.redirect(`${process.env.HOST}/login`, 303)
				}
			}
		}
	}

	return NextResponse.next()
}
