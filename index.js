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


const data = {
Resolve: 0,
     New: 0,
     Pending: 0
};

//User data
const users = []
const user_data = {
     username: '',
     realname: '',
     email: ''
}

//Ticket data
const new_ticket = {
     id: 0,
     request_by: '',
     request_for: '',
     service_offering: '',
     item: '',
     contact_type: '',
     status: '',
     assigned: '',
     category: '',
     symptom: '',
     impact: '',
     urgency: '',
     priority: '',
     
}
let ticket_id = 0;
let search_ticket = 0;

//KB data
const kb = []
const new_BK = {
     KB: 0,
     title: '',
     description: ''
}
let kb_id = 0;
let search_kb = 0;




//Important functions
function existing_KB() {
     connection.query('SELECT COUNT(*) as count FROM Admin;', function (err, first) {
          connection.query('SELECT * FROM KnowledgeBase;', function (err, second) {
               for (var i = 1; a <= first[0].count; i++){
                    kb.push({ KB:second[i].KB,title:second[i].title })
               }
          })
     })
}

function existing_users() {
     connection.query('SELECT COUNT(username) as count FROM Admin;', function (err, first) {
          connection.query('SELECT * FROM Admin;', function (err, second) {
               for (var a = 1; a <= first[0].count; a++) {
                    users.push(second[a].username)
               }
          })
     })
}

function update_counters() {
     connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "resolved";', function (err, resolved) {
          data.Resolve = resolved[0].count;
          connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "new";', function (err, t_new) {
               data.New = t_new[0].count;
               connection.query('SELECT COUNT(*) as count FROM Ticket WHERE status = "pendingVendor" AND status = "pendingAdmin";', function (err, progress) {
                    data.Pending = progress[0].count
               });
          });
     });
};


//Home(login) Route
app.get('', function (req, res) {
     update_counters();
     res.render(path.join(__dirname, '/views/login'), { text: '' });
});

app.post('', function (req, res) {
     update_counters();
     const { username, password } = req.body
     connection.query(`SELECT * FROM Admin WHERE username = "${username}" AND password = "${password}"`, function (err, result) {
          if (result[0] === undefined) {
               res.render(path.join(__dirname, '/views/login', { text: 'Username or password not correct' }))
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
     existing_users();
     existing_KB();
     update_counters();
     res.render(path.join(__dirname, '/views/backlog'), { user: user_data, data: data });
});

app.post('/search', function (req, res) {
     const { Search } = req.body
     const [word, digit] = Search.split(/(?<=\D)(?=\d)/);

     switch (word) {
          case 'KB':
               search_kb = parseInt(digit);
               connection.query(`SELECT * FROM KnowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
                    res.render(path.join(__dirname, '/views/kbarticle'), { data: first[0], user: user_data, users: users });
               });
               break;
          case 'INC':
               search_ticket = parseInt(digit);
               connection.query(`SELECT * FROM Ticket WHERE id = ${search_ticket};`, function (err, first) {
                    res.render(path.join(__dirname, '/views/ticket'), { data: first[0], user: user_data, users: users });
               })
               break;
     }
});


//Ticket auto creator
app.get('/ticket_create', function (req, res) {
     connection.query(`SELECT COUNT(*) AS count FROM Ticket;`, function (err, result) {
          ticket_id = result[0].count;
          ticket_id += 1;
          new_ticket.id = ticket_id
          res.render(path.join(__dirname, '/views/ticket'), { data: new_ticket, users: users, user: user_data,KB:kb });
     })
})



//Tickets Route
app.get('/ticket', function (req, res) {
     existing_KB();
     connection.query(`SELECT * FROM Ticket WHERE id = ${search_ticket};`, function (err, first) {
          res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: users, KB: kb });
     })
})


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
               break;
          case 'medium':
               if (Urgency == 'medium') {
                    Priority = '3-High';

               } else {
                    Priority = '4-Medium';

               }
               break;
          case 'low':
               Urgency = 'low'
               Priority = '5-Low';
               break;
     }
     connection.query(`INSERT INTO Ticket VALUES(${incNum},"${reqBy}",\
     "${reqFor}","${srvcOf}","${confItem}","${contactType}",\
     "${State}","${Assigned}","${Category}","${Symptom}",\
     "${Impact}","${Urgency}""${Priority}");`);
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
          new_BK.KB = kb_id
               res.render(path.join(__dirname, '/views/kbarticle'), { data: new_BK, user: user_data });
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
     existing_KB();
});

//KB list
app.get('/all_kb', function (req, res) {
     connection.query('SELECT * FROM KnowledgeBase;', function (err, result) {
          connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, first) {
               res.render(path.join(__dirname, '/views/kblist'), {
                    title: 'KnowledgeBase', data: result, count: first[0], user: user_data
               });
          });
     });
});

// app.get('/Pending', function (req, res) {
//      connection.query('SELECT * FROM Ticket WHERE status = "pendingAdmin" AND status = "pendingVendor";', function (err, result) {
//           if (result[0] != undefined) {
//                res.render(path.join(__dirname, '/views/kblist'), { title: 'Incidents', user: user_data, data: result })
//           } else {
//                res.render(path.join(__dirname, '/views/kblist'), { title: 'No pending incidents', user: user_data, data: null })
//           }
//      })
// })

//all user's incidents
app.get('/my_inc', function (req, res) {
     connection.query(`SELECT * FROM Tickets WHERE assigned = "${user_data.username}";`, function (err, result) {
          connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, first) {
               if (result != undefined) {
                    res.render(path.join(__dirname, 'views/kblist'), { title: 'My incidents', count: first[0], user: user_data, data: result })
               } else {
                    res.render(path.join(__dirname, '/views/kblist'), { title: 'No pending incidents', count: first[0], user: user_data, data: null })
               }

          });
     })
});


// app.post('/cancel_kb', function (req, res) {
//      const { kbarticle } = req.body
//      connection.query(`DELETE FROM KnowledgeBase WHERE KB = ${kbarticle};`)
// })


// app.post('/cancel_ticket', function (req, res) {
//      const { incNum } = req.body
//      connection.query(`DELETE FROM Ticket WHERE id = ${incNum};`)
// })


//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));