const sql = require('mysql');

//connection SQL
const user = sql.createConnection({
    host: 'localhost',
    user: 'client',
    password: '1234',
    database: 'tickets'
});

//User data
function verification(username, password) {
    user.query(`SELECT username,password FROM user WHERE username = "${username}" AND password = "${password}"`);
    if (query[0] == username && query[1] == password) {
        
    }
}
