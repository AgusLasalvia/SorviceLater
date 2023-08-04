const express = require('express');
const route = express.Router();
const sql = require('../sql')


route.get('/', (req, res) => {
    user_data.username = ""
    res.render(path.join(__dirname, '../views/login'), { text: '' });
});

route.post('/', (req, res) => {
    counter = sql.updateCounter()
    const { username, password } = req.body;
    verifcation = sql.userVerification(username, password);
    if (verifcation) {
        res.render(path.join(__dirname, '../views/login'), { user: user_data, data: counter })
    } else {
        res.render(path.join(__dirname, '../views/login'), { text: 'Username or password not correct' })
    }
});

module.exports = route;