const express = require('express');
const route = express.Router();
const sql = require('../sql')
const path = require('path');
const new_ticket = {
	id: 0,
	request_by: '',
	request_for: '',
	service_offering: '',
	item: '',
	contact_type: '',
	status: '',
	assigned: '',
	category: '',
	symptom: '',
	impact: '',
	urgency: '',
	priority: '',

}

route.get('/', (req, res) => {
	new_ticket.id = sql.getTicketCounter() + 1
	knowledge = sql.getAllKnowledgeBase()
	users = sql.getAllAdmin()
	res.render(path.join(__dirname, '/views/ticket'), {
		data: new_ticket,
		user: user_data,
		KB: knowledge,
		users: users
	});
});

module.exports = route;