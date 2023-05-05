import { ApiRequest } from "@types"

/* Shopify wants rawBody for a lot of things, but that's not a default
 ** property on NextApiRequests. This function takes a request and
 ** uses Buffer.from to generate a rawBody property. Vercel has a "micro"
 ** library that provides a buffer function intended to do this, but it doesn't
 ** seem to work.
 */
export async function transformToRawBody(req: ApiRequest) {
	const chunks = []
	for await (const chunk of req) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
	}
	const rawBody = Buffer.concat(chunks)
	return JSON.parse(Buffer.from(rawBody).toString("utf-8"))
}
