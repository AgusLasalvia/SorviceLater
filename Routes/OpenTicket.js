const express = require('express');
const route = express.Router();
const sql = require('../sql')


route.get('/:id', (req, res) => {
    ticket_id = req.params.id
    ticket = sql.getSpecificTicket(ticket_id)
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