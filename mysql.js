const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'client',
    password: '1234',
    database:'Service'
    
})


connection.connect((err) => {
    if (err) throw err
    console.log('connection successful')
})