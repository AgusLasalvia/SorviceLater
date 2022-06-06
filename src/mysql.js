const sql = require('mysql');

//connection SQL
const user = sql.createConnection({
    host: 'localhost',
    user: 'client',
    password: '1234',
    database: 'tickets'
});

const admin = sql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'tickets'
})