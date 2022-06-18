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

let ticket_id = 0;

//Home(login) Route
app.get('', function (req, res) {
     res.render(path.join(__dirname, '/views/login'),)
});

app.post('', function (req, res) {
     const { username, password } = req.body
     console.log(username, password)
     connection.query(`SELECT username FROM Admin WHERE username = "${username}" AND password = "${password}"`, function (err, result) {
          if (err) throw err
          if (result[0] === username) {
               res.render(path.join(__dirname, '/views/menu'));
          }
     });
});


//Menu Route
app.get('/menu', function (req, res) {
     const data = {
          totalResolved: 0,
          inProgress: 0,
          ticketNew: 0
     }
     connection.query('SELECT COUNT(*) FROM ticket WHERE status = "Resolved"', function (err, result) {
          if(err) throw err
          data.totalResolved = result
     });
     connection.query('SELECT COUNT(*) FROM ticket WHERE status = "New"', function (err, result) {
          if (err) throw err
          data.ticketNew = result
     });
     connection.query('SELECT COUNT(*) FROM ticket WHERE status = "In Progress"', function (err, result) {
          if (err) throw err
          data.inProgress = result
     });
     res.render(path.join(__dirname, '/views/menu'), { data: data })
});



//Tickets Route
app.get('/ticket', function (req, res) {
     const data = {
          incNum: ticket_id,
          reqBy: '',
          reqFor: '',
          srvcOf: '',
          confItem: '',
          contactType: '',
          State: '',
          Assigned: '',
          Category: '',
          Symptom: '',
          Impact: '',
          Urgency: '',
          Priority: ''
     } 
     connection.query(`SELECT * FROM ticket id=${id}`, function (err, result) {
          data.incNum = result[0], data.reqBy = result[1], data.reqFor = result[2]
          data.srvcOf = result[3], data.confItem = result[4], data.contactType = result[5]
          data.State = result[6], data.Assigned = result[7], data.Category = result[8]
          data.Symptom = result[9], data.Impact = result[10], data.Urgency = result[11]
          data.Priority = result[12]
     });
     res.render(path.join(__dirname, '/views/ticket'), { data: data });
});

app.post('/ticket', function (req, res) {
     const { incNum, reqBy, reqFor, srvcOf,
          confItem, contactType, State,
          Assigned, Category, Symptom, Impact,
          Urgency, Priority } = req.body;
     connection.query(`UPDATE Ticket SET request_by = "${reqBy}",\
     request_for = "${reqFor}",service_offering = "${srvcOf}",\
     item = "${confItem}",contact_type = "${contactType}",\
     status = "${State}",assigned = "${Assigned}",\
     category = "${Category}",symptom = "${Symptom}",\
     impact = "${Impact}",urgency = "${Urgency}",priority = "${Priority}"\
     WHERE id = ${incNum};`);
});


//Ticket auto creator
app.post('/ticket_create', function (req, res) {
     id_new = 0;
     connection.query(`SELECT id FROM Ticket ORDER BY DESC;"`, function (err, result) {
          id_new = result[0] + 1
     });
     connection.query(`INSERT INTO ticket VALUES(${id_new},NULL,\
     NULL,NULL,NULL,NULL,\
     NULL,NULL,NULL,\
     NULL,NULL,NULL,NULL;`);
});



//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));
