const express = require('express');
const route = express.Router();
const sql = require('../sql')
const { user_data } = require('../index')
const path = require('path');

route.get('/:id', (req, res) => {
    knowledge = sql.getSpecificKnlowledgeBase(req.params.id);
    res.render(path.join(__dirname, '/views/kbarticle'), { data: knowledge, user: user_data });
});

route.post('/', (req, res) => {
    const { kbarticle, title, knowledge } = req.body;
    verify = sql.verifyExistingKnowledge(knowledge);
    if (verify) {
        sql.updateKnowledgeBase(knowledge, title, kbarticle);
    } else {
        sql.insertNewKnowledgeBase(knowledgebase, title, kbarticle);
    }
    res.redirect(path.join('/backlog'));
})



module.exports = route;