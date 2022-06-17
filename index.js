//imports
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 3000

// database connection
// const connection = mysql.createConnection({
//      host: "localhost",
//      user: "admin",
//      password: "minecraft1234",
//      database: "servicelater"
// });

// connection.connect((err) => {
//      if (err) throw err
//      console.log('db connected')
// });


//statics
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use('/styles', express.static(__dirname + "/styles"));
app.use('/js', express.static(__dirname + '/js'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.get('', (req, res) => {
     res.render(path.join(__dirname, '/views/login'),)
});


app.post('', (req, res) => {
     const { username, password } = req.body
     console.log(username, password)
     // connection.query(`SELECT username FROM Admin WHERE username = "${username}" AND password = "${password}"`, function (err, result, fields) {
     //      if (err) throw err
     //      console.log(result)
     res.render(path.join(__dirname, '/views/ticket'))
     })
// });



app.get('/menu', (req, res) => {
});


app.get('/ticket', (req, res) => {
     // res.sendFile(path.join(__dirname, './Templates/ticket.html'))
     res.render(path.join(__dirname, '/views/ticket'),)
});
app.post('/ticket', (req, res) => {

});

//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));
