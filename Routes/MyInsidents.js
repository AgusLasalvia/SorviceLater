const express = require('express');
const route = express.Router();
const sql = require('../sql')

route.get('/', (req, res) => {
    tickets = sql.getAllMyIncidents(user_data.username);
    knowledgebaseCounter = sql.getKnowledgeCounter();
    if (tickets != undefined) {
        res.render(path.join(__dirname, 'views/kblist'), {
            title: 'Incidents',
            count: knowledgebaseCounter,
            user: user_data,
            data: tickets
        })
    } else {
        res.render(path.join(__dirname, '/views/kblist'), {
            title: 'No pending incidents',
            count: knowledgebaseCounter,
            user: user_data, data: null
        })
    }
});

module.exports = route;