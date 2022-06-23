//imports
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 3000

//database connection
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


// Engine
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);


//statics
app.use('/styles', express.static(__dirname + "/styles"));
app.use('/js', express.static(__dirname + '/js'));
app.use('/static', express.static(__dirname + '/static'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const user_data = {
     username: '',
     realname: '',
     email: ''
}

const data = {
     resolve: 0,
     New: 0,
     inP: 0
};

let ticket_id = 0;

function update_counters() {
     connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "resolved";', function (err, resolved) {
          data.resolve = resolved[0].count;
          connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "new";', function (err, t_new) {
               data.New = t_new[0].count;
               connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "inProgress";', function (err, progress) {
                    data.inP = progress[0].count;
                    return console.log(data);
               });
          });
     });
};

//Home(login) Route
app.get('', function (req, res) {
     update_counters();
     res.render(path.join(__dirname, '/views/login'),)
});

app.post('', function (req, res) {
     const { username, password } = req.body
     connection.query(`SELECT * FROM Admin WHERE username = "${username}" AND password = "${password}"`, function (err, result) {
          if (err) throw err
          if (result[0].username === username) {
               user_data.username = result[0].username
               user_data.realname = result[0].name
               user_data.email = result[0].email
               res.render(path.join(__dirname, '/views/menu'), { user: user_data, data: data });
          }
     });
});


//Menu Route
app.get('/menu', function (req, res) {
     update_counters();
     res.render(path.join(__dirname, '/views/menu', { user: user_data, data: data }));
});


//Tickets Route
app.get('/ticket', function (req, res) {
     const users = []
     connection.query(`SELECT * FROM Ticket WHERE id = ${ticket_id};`, function (err, first) {
          connection.query(`SELECT username FROM Admin;`, function (err, second) {
               connection.query('SELECT COUNT(username) as count FROM Admin;', function (err, third) {
                    for (var a = 1; a < parseInt(third[0].count); a++) {
                         users.push(second[a].username)
                    }
                    res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: users });
               })
          })
     })
});


app.post('/ticket', function (req, res) {
     const { incNum, reqBy, reqFor, srvcOf,
          confItem, contactType, State,
          Assigned, Category, Symptom, Impact,
          Urgency, Priority } = req.body;
     connection.query(`UPDATE Ticket SET request_by = "${reqBy}",
     request_for = "${reqFor}",service_offering = "${srvcOf}",
     item = "${confItem}",contact_type = "${contactType}",
     status = "${State}",assigned = "${Assigned}",
     category = "${Category}",symptom = "${Symptom}",
     impact = "${Impact}",urgency = "${Urgency}",priority = "${Priority}"
     WHERE id = ${incNum};`);
     res.render(path.join(__dirname, '/views/menu'), { data: data, user: user_data });
     
});


//Ticket auto creator
app.get('/ticket_create', function (req, res) {
     connection.query(`SELECT COUNT(*) AS count FROM Ticket;`, function (err, result) {
          ticket_id = result[0].count;
          ticket_id += 1;
          connection.query(`INSERT INTO Ticket VALUES(${ticket_id},NULL,NULL,NULL,NULL,NULL,NULL,'lasa1307',NULL,NULL,NULL,NULL,NULL);`);
          const users = []
          connection.query(`SELECT * FROM Ticket WHERE id = ${ticket_id};`, function (err, first) {
               connection.query(`SELECT username FROM Admin;`, function (err, second) {
                    connection.query('SELECT COUNT(username) as count FROM Admin;', function (err, third) {
                         for (var a = 1; a < parseInt(third[0].count); a++) {
                              users.push(second[a].username)
                         }
                         res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: users });
                    })
               })
          })
     });
});




//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));


