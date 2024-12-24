const express = require('express');
const route = express.Router();
const sql = require('../sql')
const path = require('path');

route.get('/:id', (req, res) => {
	ticket = sql.getSpecificTicket(req.params.id)
	users = sql.getAllAdmin()
	knowledge = sql.getAllKnowledgeBase()
	res.render(path.join(__dirname, '/views/ticket'), {
		data: ticket,
		users: users,
		user_count: users.count,
		KB: knowledge
	});
});

route.post('/', (req, res) => {
	sql.insertNewTicket(req.body, user_data);
	counter = sql.updateCounter()
	res.redirect(path.join('/backlog'), { count: counter });
});


module.exports = route;