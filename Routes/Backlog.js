const express = require('express');
const route = express.Router();
const sql = require('../sql')
const path = require('path');

route.get('/', (req, res) => {
    counter = sql.updateCounter();
    res.render(path.join(__dirname, '/views/backlog'), { user: user_data, count: counter });
});

module.exports = route;