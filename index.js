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
});

connection.connect((err) => {
     if (err) throw err
     console.log('db connected')
});


//statics
app.use('/styles', express.static(__dirname + "/styles"));
app.use('/js', express.static(__dirname + '/js'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, '/Templates/login.html'))
     const { } = req
});


app.post('/', (req, res) => {
     const { username, password } = req.body
     console.log(username, password)
     connection.query(`SELECT username FROM Admin WHERE username = "${username}" AND password = "${password}"`, function (err, result, fields) {
          if (err) throw err
          console.log(result)
          if (result[0].username === username) {
               res.redirect(path.join(__dirname, './Templates/menu.html'))
          } else {
               res.send('<p>ERROR</p>')
          }
     })
});



app.get('/menu', (req, res) => {
     res.sendFile(path.join(__dirname, '/Templates/menu.html'))
});


app.get('/ticket', (req, res) => {
     res.sendFile(path.join(__dirname, './Templates/ticket.html'))
});
app.post('/ticket', (req, res) => {

});

//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));
