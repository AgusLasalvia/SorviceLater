//imports
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 3000

// database connection
const connection = mysql.createConnection({
     host: "localhost",
     user: "admin",
     password: "minecraft1234",
     database: "servicelater"


})
connection.connect((err) => {
     if (err) throw err
     console.log('db connected')
})


//statics
app.use('/styles', express.static(__dirname + "/styles"))
app.use('/js', express.static(__dirname + '/js'))
app.use('/static', express.static(__dirname + '/static'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

actual_user = {
}
//main route (post and get method)
app.get('/login', (req, res) => {
     res.sendFile(path.join(__dirname, '/Templates/login.html'))
});
app.post('/login', (req, res) => {
     const { username, password } = req.body
     sql = connection.query(`SELECT * FROM Admin WHERE username = "${username} AND password = "${password}"`)
     if (username === sql[0]) {
          actual_user = {
               username: sql[0],
               u_name: sql[2],
               lastname: sql[3],
               email: sql[4]
          }
          res.sendFile(path.join(__dirname, '/Templates/menu.html'))
     }


});


app.get('/menu', (req, res) => {
     res.sendFile(path.join(__dirname, '/Templates/menu.html'))
})


//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`))



