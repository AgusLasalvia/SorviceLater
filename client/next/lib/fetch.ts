import * as Interfaces from "./interfaces"

const API_BASE_URL = process.env.API_BASE_URL


// --------------------------------------- //
//								User                    //
// --------------------------------------- //

export const fetchLogin = async (body: Interfaces.Login) => {
	const response = await fetch("http://localhost:3030/auth/platform",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}
	)

	return response.status == 404 ? 404 : response.status == 500 ? 500 : await response.json()
};


// --------------------------------------- //
//							Knowledge
// --------------------------------------- //

export const fetchCountKnowledge = async () => {
	const response = await fetch("http://localhost:3030/knowledge/count", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})
	return response.status == 404 ? 404 : await response.json()
}

export const fetchKnowledge = async (body: Interfaces.Knowledge) => {
	const response = await fetch("http://localhost:3030/knowledge/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	return response.status == 404 ? 404 : response.status == 500 ? 500 : await response.json()
}