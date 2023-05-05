import { ApiRequest } from "@types"
import { buffer } from "micro"

export async function transformToRawBody(req: ApiRequest) {
	const bodyBuffer = await buffer(req)
	const rawBodyString = await bodyBuffer.toString()
	return rawBodyString
}
