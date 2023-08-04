const express = require('express');
const route = express.Router();
const sql = require('../sql');
const path = require('path');

route.get('/', function (req, res) {
    knowleadgebase = sql.getAllKnowledgeBase();
    res.render(path.join(__dirname, '/views/kblist'), {
        title: 'KnowledgeBase', data: knowleadgebase, count: knowleadgebase[0].count, user: user_data
    });
});

module.exports = route;