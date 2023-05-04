import { RedisSessionStorage } from "@shopify/shopify-app-session-storage-redis"
import Shopify from "@shopify/shopify-api"

import fetch from "node-fetch"

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL

const headers = {
	Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
	Accept: "application/json",
	"Content-Type": "application/json",
}

const storeCallback = async (session) => {
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

	return result === "OK"
}

const loadCallback = async (id) => {
	const { result } = await fetch(`${upstashRedisRestUrl}/get/${id}`, {
		method: "GET",
		headers,
	}).then((res) => res.json())

	return JSON.parse(result)
}

const deleteCallback = async (id) => {
	const { result } = await fetch(`${upstashRedisRestUrl}/del/${id}`, {
		method: "DELETE",
		headers,
	}).then((res) => res.json())

	return result === "OK"
}

// const SessionStorage = new Shopify.Session.CustomSessionStorage(storeCallback, loadCallback, deleteCallback)

const redisUrl = process.env.UPSTASH_REDIS_CONNECTION_STRING
const clientUrl = new URL(redisUrl)
console.log("Redis URL: ", redisUrl)
console.log("Client URL: ", clientUrl)

const SessionStorage = new RedisSessionStorage(clientUrl, {
	url: clientUrl.toString(),
	socket: {
		tls: true,
		rejectUnauthorized: false,
	},
	onError(error) {
		console.error(error)
	},
})

export default SessionStorage
