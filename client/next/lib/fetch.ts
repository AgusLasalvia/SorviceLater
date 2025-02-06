import * as Interfaces from "./interfaces"

const API_BASE_URL = process.env.API_BASE_URL


// --------------------------------------- //
//								User                    //
// --------------------------------------- //

export const fetchLogin = async (body: Interfaces.Login) => {
	const response = await fetch("http://localhost:5000/auth/platform",
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
//								Ticket
// --------------------------------------- //
export const fetchTicketStateCounters = async () => {
	const response = await fetch("http://localhost:5000/ticket/counters", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})
	return await response.json()
}




// --------------------------------------- //
//							Knowledge
// --------------------------------------- //

export const fetchCountKnowledge = async () => {
	const response = await fetch("http://localhost:5000/knowledge/count", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})

	return await response.json()
}


export const fetchKnowledge = async (body: Interfaces.Knowledge) => {
	const response = await fetch("http://localhost:5000/knowledge/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	return response.status == 404 ? 404 : response.status == 500 ? 500 : await response.json()
}


export const fetchAllKnowledge = async (): Promise<Interfaces.Knowledge[]> => {
	const response = await fetch("http://localhost:5000/knowledge/all", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
	return response.json();
}