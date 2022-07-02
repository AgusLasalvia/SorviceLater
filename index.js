//imports
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 3000

// Database connection
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


// statics
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
     Resolve: 0,
     New: 0,
     Pending: 0
};

let ticket_id = 0;
let search_ticket = 0;

let kb_id = 0;
let search_kb = 0;


function update_counters() {
     connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "resolved";', function (err, resolved) {
          data.Resolve = resolved[0].count;
          connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "new";', function (err, t_new) {
               data.New = t_new[0].count;
               connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "pendingVendor" AND status = "pendingAdmin";', function (err, progress) {
                    
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
     update_counters();
     const { username, password } = req.body
     connection.query(`SELECT * FROM Admin WHERE username = "${username}" AND password = "${password}"`, function (err, result) {
          if (result[0] === undefined) {
               res.send('<script> prompt("Username or Password not correct.")</script >')
          } else if (result[0].username === username) {
               user_data.username = result[0].username
               user_data.realname = result[0].name
               user_data.email = result[0].email
               res.render(path.join(__dirname, '/views/backlog'), { user: user_data, data: data });
          }
     })
});


//backlog Route
app.get('/backlog', function (req, res) {
     update_counters();
     res.render(path.join(__dirname, '/views/backlog'), { user: user_data, data: data });
});

app.post('/backlog', function (req, res) {
     const { Search } = req.body
     const [word, digit] = Search.split(/(?<=\D)(?=\d)/);
     if (word === 'KB') {
          search_kb = parseInt(digit);
          connection.query(`SELECT * FROM KnowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
               res.render(path.join(__dirname, '/views/kbarticle'), { data: first[0], user: user_data });
          });
          res.redirect('/views/kbarticle')
     } else if (word === 'INC') {
          search_ticket = parseInt(digit);
          connection.query(`SELECT * FROM Ticket WHERE id = ${search_ticket};`, function (err, first) {
               res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: users });
          })
     }
});


//Ticket auto creator
app.get('/ticket_create', function (req, res) {
     connection.query(`SELECT COUNT(*) AS count FROM Ticket;`, function (err, result) {
          ticket_id = result[0].count;
          ticket_id += 1;
          const users = [];
          connection.query(`INSERT INTO Ticket VALUES(${ticket_id},NULL,NULL,NULL,NULL,NULL,NULL,'lasa1307',NULL,NULL,NULL,NULL,NULL);`);
          connection.query(`SELECT * FROM Ticket WHERE id = ${ticket_id};`, function (err, first) {
               connection.query(`SELECT username FROM Admin;`, function (err, second) {
                    connection.query('SELECT COUNT(username) as count FROM Admin;', function (err, third) {
                         for (var a = 0; a < third[0].count; a++) {
                              users.push(second[a].username)
                         }
                         res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: users, user: user_data });
                    })
               })
          })
     });
});

//Tickets Route
app.get('/ticket', function (req, res) {
     const users = []
     connection.query(`SELECT * FROM Ticket WHERE id = ${search_ticket};`, function (err, first) {
          connection.query(`SELECT username FROM Admin;`, function (err, second) {
               connection.query('SELECT COUNT(username) as count FROM Admin;', function (err, third) {
                    for (var a = 1; a < parseInt(third[0].count); a++) {
                         users.push(second[a].username)
                    }
                    update_counters();
                    res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: users });
               })
          })
     })
});


//Ticket Modification
app.post('/ticket', function (req, res) {
     const { incNum, reqBy, reqFor, srvcOf,
          confItem, contactType, State,
          Assigned, Category, Symptom, Impact,
          Urgency } = req.body;
     let Priority = '';
     switch (Impact) {
          case 'high':
               if (Urgency == 'high') {

                    Priority = '1-Urgent';

               } else {
                    Priority = '2-Very High';

               }
          case 'medium':
               if (Urgency == 'medium') {
                    Priority = '3-High';

               } else {
                    Priority = '4-Medium';

               }
          case 'low':
               if (Urgency == 'low') {
                    Priority = '5-Low';
               }
     }
     connection.query(`UPDATE Ticket SET request_by = "${reqBy}",\
     request_for = "${reqFor}",service_offering = "${srvcOf}",\
     item = "${confItem}",contact_type = "${contactType}",\
     status = "${State}",assigned = "${Assigned}",\
     category = "${Category}",symptom = "${Symptom}",\
     impact = "${Impact}",urgency = "${Urgency}",priority = "${Priority}"\
     WHERE id = ${incNum};`);
     update_counters();
     res.render(path.join(__dirname, '/views/backlog'), { data: data, user: user_data });

});





app.get('/all_inc', function (req, res) {
     connection.query('SELECT * FROM Ticket;', function (err, result) {
          connection.query('SELECT COUNT(*) AS count FROM Ticket;', function (err, first) {
               res.render(path.join(__dirname, '/views/kblist'), {
                    title: 'Incidents', data: result, count: first[0], user: user_data
               });
          });
     });
});


//KnowledgeBase Routes
app.get('/kb_create', function (req, res) {
     connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, result) {
          kb_id = result[0].count;
          kb_id += 1;
          connection.query(`INSERT INTO KnowledgeBase VALUES(${kb_id},NULL,NULL);`);
          connection.query(`SELECT * FROM KnowledgeBase WHERE KB = ${kb_id};`, function (req, first) {
               res.render(path.join(__dirname, '/views/kbarticle'), { data: first[0], user: user_data });
          })
     })
});

app.get('/kbarticle', function (req, res) {
     connection.query(`SELECT * FROM KnowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
          res.render(path.join(__dirname, '/views/kbarticle'), { data: first[0], user: user_data });
     })
});

app.post('/kbarticle', function (req, res) {
     const { kbarticle, title } = req.body
     const knowledge = req.body.knowledge
     connection.query(`UPDATE KnowledgeBase SET title="${title}",description = "${knowledge} WHERE KB = ${kbarticle}`);
     update_counters();
     res.render(path.join(__dirname, '/views/backlog'), { data: data, user: user_data });
});

app.get('/all_kb', function (req, res) {
     connection.query('SELECT * FROM KnowledgeBase;', function (err, result) {
          connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, first) {
               res.render(path.join(__dirname, '/views/kblist'), {
                    title: 'KnowledgeBase', data: result, count: first[0], user: user_data
               });
          });
     });
});

app.get('/Pending', function (req, res) {
     connection.query('SELECT * FROM Ticket WHERE status = "pendingAdmin" AND status = "pendingVendor";', function (err, result) {
          if (result[0] != undefined) {
               res.render(path.join(__dirname, '/views/kblist'), { title: 'Incidents', user: user_data, data: result })
          } else {
               res.render(path.join(__dirname, '/views/kblist'), { title: 'No pending incidents', user: user_data, data: null })
          }
     })
})





//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));


