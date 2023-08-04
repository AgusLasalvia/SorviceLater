const express = require('express');
const route = express.Router();
const sql = require('../sql')
const path = require('path');
const new_BK = {
    KB: 0,
    title: '',
    description: ''
}
route.get('/', (req, res) => {
    new_BK.KB = sql.getKnowledgeCounter() + 1;
    res.render(path.join(__dirname, '/views/kbarticle'), { data: new_BK, user: user_data });
});

module.exports = route;