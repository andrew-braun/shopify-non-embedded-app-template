// https://github.com/Shopify/shopify-app-js/blob/main/packages/shopify-app-session-storage/implementing-session-storage.md
import { SessionStorage } from "@shopify/shopify-app-session-storage"
import { Session } from "@shopify/shopify-api"

import fetch from "node-fetch"

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL

const headers = {
	Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
	Accept: "application/json",
	"Content-Type": "application/json",
}

/* This implements a custom session storage instance using a Redis database.
 ** Shopify has their own Redis session storage implementation, but it
 ** was causing endless bugs. This is based on the Shopify example, and it works.
 ** Currently, it uses Upstash, but it can be modified to use any Redis database with
 ** an API endpoint (or theoretically via a client library)
 */
export class CustomSessionStorageClass implements SessionStorage {
	constructor() {}

	public async storeSession(session: Session): Promise<boolean> {
		try {
			const { result } = await fetch(
				`${upstashRedisRestUrl}/set/${session.id}${
					!session.id.includes("offline") ? "?EX=300" : ""
				}`,
				{
					method: "POST",
					headers,
					body: JSON.stringify(session),
				}
			).then((res) => res.json())

			console.log("Stored session in Redis")

			return result === "OK"
		} catch (error) {
			console.error(error)
		}
	}

	public async loadSession(id: String) {
		try {
			const { result } = await fetch(`${upstashRedisRestUrl}/get/${id}`, {
				method: "GET",
				headers,
			}).then((res) => res.json())

			console.log("Loaded session from Redis")
			return JSON.parse(result)
		} catch (error) {
			console.error(error)
		}
	}

	public async deleteSession(id: String) {
		try {
			const { result } = await fetch(`${upstashRedisRestUrl}/del/${id}`, {
				method: "DELETE",
				headers,
			}).then((res) => res.json())

			console.log("Deleted session from Redis")
			return result === "OK"
		} catch (error) {
			console.error(error)
		}
	}

	public async deleteSessions(ids: String[]) {
		try {
			// This code may not work--can test it later
			const { result } = await fetch(
				`${upstashRedisRestUrl}/del/${ids.join(",")}`,
				{
					method: "DELETE",
					headers,
				}
			).then((res) => res.json())

			return result === "OK"
		} catch (error) {
			console.error(error)
		}
	}

	public async findSessionsByShop(shop: String) {
		try {
			// This code may not work--can test it later
			const { result } = await fetch(`${upstashRedisRestUrl}/keys/${shop}*`, {
				method: "GET",
				headers,
			}).then((res) => res.json())

			return result
		} catch (error) {
			console.error(error)
		}
	}
}

const CustomSessionStorage = new CustomSessionStorageClass()

export default CustomSessionStorage
