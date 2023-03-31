//imports
//const mysql = require('mysql');
const { Pool } = require('pg');
const express = require('express');
const path = require('path');
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require("express-session")
const app = express()

const routes = express.Router();

var port = process.env.PORT || 5000;


// PostgresSQL connection
const connection = new Pool({
     connectionString: 'postgres://izkusvbefpjcui:7443a6554c3ac04033b7fb8d428acf3d8bcb04258907c0a238967d9c53c25333@ec2-44-209-24-62.compute-1.amazonaws.com:5432/d8rb9kl232k3b1',
     host: "ec2-44-209-24-62.compute-1.amazonaws.com",
     user: "izkusvbefpjcui",
     password: "7443a6554c3ac04033b7fb8d428acf3d8bcb04258907c0a238967d9c53c25333",
     database: "d8rb9kl232k3b1",
     port: 5432,
     ssl: {
          rejectUnauthorized: false
     },
     keepAlive: true
});

// MySQL Connection
// const connection = mysql.createConnection({
//      host: "ec2-44-209-24-62.compute-1.amazonaws.com",
//      user: "gnoellfbbbujkx",
//      password: "0fd585265a9e50e6a4965f9af22d5f18c49cf32dbda5ff0c29d437060cd4cd2d",
//      database: "da1eroecl12e1b",
//      port: 5432,
//      hero
// });

//connection verification
connection.connect((err) => {
     if (err) throw err
     console.log('db connected')
});


// Engine
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);


// statics
app.use('/styles', express.static(__dirname + "/styles"));
app.use('/static', express.static(__dirname + '/static'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParse())
app.use(session({
     secret: 'secret-key',
     resave: false,
     saveUninitialized: true

}));

// Counter  init data
const data = {
     Resolve: 0,
     New: 0,
     Pending: 0
};

//User data
const user_data = {
     username: '',
     realname: '',
     email: ''
}

//Ticket data
let ticket_id = 0;
let search_ticket = 0;
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

//KB data
let kb_id = 0;
let search_kb = 0;
const new_BK = {
     KB: 0,
     title: '',
     description: ''
}



//Counter update function
update_counters = () => {
     connection.query("SELECT COUNT(*) as count FROM ticket WHERE status = 'resolved';", function (err, resolved) {
          console.log(resolved.rows[0].count)
          data.Resolve = resolved.rows[0].count;

          connection.query("SELECT COUNT(*) as count FROM ticket WHERE status = 'new';", function (err, t_new) {
               data.New = t_new.rows[0].count;

               connection.query("SELECT COUNT(*) as count FROM ticket WHERE status = 'pendingVendor' AND status = 'pendingAdmin';", function (err, progress) {
                    data.Pending = progress.rows[0].count

               });
          });
     });
};


//Home(login) Route
app.get('/', (req, res) => {
     user_data.username = ""
     res.render(path.join(__dirname, '/views/login'), { text: '' });

});

app.post('/', (req, res) => {
     update_counters();
     const { username, password } = req.body
     connection.query(`SELECT * FROM admin WHERE username = '${username}' AND password = '${password}';`, function (err, result) {
          if (err) throw err
          console.log(result.rows[0].username)
          if (result.rows[0].username == undefined) {
               res.render(path.join(__dirname, '/views/login'), { text: 'Username or password not correct' })

          } else if (result.rows[0].username === username) {
               user_data.username = result.rows[0].username
               res.render(path.join(__dirname, '/views/backlog'), { user: user_data, data: data });
          }
     })
});


//Backlog Route
app.get('/backlog', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          update_counters();
          res.render(path.join(__dirname, '/views/backlog'), { user: user_data, data: data });
     }
});

app.post('/search', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          const { Search } = req.body
          const [word, digit] = Search.split(/(?<=\D)(?=\d)/);

          switch (word) {
               case 'KB':
                    search_kb = parseInt(digit);
                    connection.query(`SELECT * FROM knowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
                         res.render(path.join(__dirname, '/views/kbarticle'), { data: first.rows[0], user: user_data });
                    });
                    break;
               case 'INC':
                    search_ticket = parseInt(digit);
                    connection.query("SELECT COUNT(*) as count FROM KnowledgeBase;", function (err, first) {
                         connection.query("SELECT * FROM KnowledgeBase;", function (err, second) {
                              connection.query("SELECT COUNT(username) as count FROM admin;", function (err, third) {
                                   connection.query("SELECT username FROM admin;", function (err, forth) {
                                        connection.query(`SELECT * FROM ticket WHERE id = ${search_ticket};`, function (err, final) {
                                             res.render(path.join(__dirname, '/views/ticket'), {
                                                  data: final.rows[0], user: user_data,
                                                  KB: second.rows, count: first.rows[0].count,
                                                  user_count: third.rows[0].count, users: forth
                                             });
                                        });
                                   });
                              });

                         });
                    })
                    break;
          }
     }
})


//Ticket creator
app.get('/ticket_create', (req, res) => {
     if (user_data.username === '') {
          verification(req, res)
     } else {
          connection.query(`SELECT COUNT(*) AS count FROM Ticket;`, function (err, result) {
               ticket_id = result.rows[0].count;
               ticket_id += 1;
               new_ticket.id = ticket_id
               connection.query("SELECT COUNT(*) as count FROM KnowledgeBase;", function (err, first) {
                    connection.query("SELECT * FROM KnowledgeBase;", function (err, second) {
                         connection.query("SELECT COUNT(username) as count FROM admin;", function (err, third) {
                              connection.query("SELECT username FROM admin;", function (err, forth) {
                                   res.render(path.join(__dirname, '/views/ticket'), {
                                        data: new_ticket, user: user_data,
                                        KB: second.rows, count: first.rows[0].count,
                                        user_count: third.rows[0].count, users: forth.rows
                                   });
                              });
                         });
                    });
               });
          });
     }
});



//Tickets Route
app.get('/ticket', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT * FROM ticket WHERE id = ${search_ticket};`, function (err, first) {
               connection.query("SELECT COUNT(username) as count FROM admin;", function (err, second) {
                    connection.query("SELECT username FROM admin;", function (err, third) {
                         res.render(path.join(__dirname, '/views/ticket'), { data: first.rows[0], users: third.rows, user_count: second.rows[0].count, KB: kb });
                    })
               })
          })
     }
})


//Ticket Modification
app.post('/ticket', (req, res) => {
     const { incNum, reqBy, reqFor, srvcOf,
          confItem, contactType, State,
          Assigned, Category, Symptom, Impact,
          Urgency, Description, Kb } = req.body;
     const worknotes = req.body.worknotes
     const addcomments = req.body.addcomments
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
     connection.query(`SELECT COUNT(id) as count FROM ticket WHERE id = ${incNum};`, function (err, result) {
          if (err) throw err
          if (result.rows[0].count == 1) {
               connection.query(`UPDATE Ticket SET request_by = '${reqBy}',\
          request_for = '${reqFor}',service_offering = '${srvcOf}',\
          item = '${confItem}',contact_type = '${contactType}',\
          status = '${State}',assigned = '${Assigned}',\
          category = '${Category}',symptom = '${Symptom}',\
          impact = "${Impact}",urgency = '${Urgency}',priority = '${Priority}',\
          description = '${Description}',KB = ${Kb},worknotes = '${worknotes}',\
          additional = '${addcomments}' WHERE id = ${incNum};`);
               ;
          } else {
               connection.query(`INSERT INTO Ticket VALUES(${incNum},'${reqBy}',\
          '${reqFor}','${srvcOf}','${confItem}','${contactType}',\
          '${State}','${Assigned}','${Category}','${Symptom}',\
          '${Impact}","${Urgency}','${Priority}','${Description}',${Kb},'${user_data.username}:  ${worknotes}',\
          '${user_data.username}:  ${addcomments}');`);

          }
     });
     update_counters();
     res.redirect(path.join('/backlog'));
});

app.get('/all_inc', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query("SELECT * FROM Ticket;", function (err, result) {
               connection.query("SELECT COUNT(*) AS count FROM Ticket;", function (err, first) {
                    res.render(path.join(__dirname, '/views/kblist'), {
                         title: 'Incidents', data: result.rows, count: first.rows[0], user: user_data
                    });
               });
          });
     }
});


//KnowledgeBase Routes
app.get('/kb_create', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query("SELECT COUNT(*) AS count FROM KnowledgeBase;", function (err, result) {
               kb_id = result[0].count;
               kb_id += 1;
               new_BK.KB = kb_id
               res.render(path.join(__dirname, '/views/kbarticle'), { data: new_BK, user: user_data });
          })
     }
});

app.get('/kbarticle', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT * FROM knowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
               res.render(path.join(__dirname, '/views/kbarticle'), { data: first.rows[0], user: user_data });
          })
     }
});

app.post('/kbarticle', (req, res) => {
     const { kbarticle, title } = req.body
     const knowledge = req.body.knowledge
     connection.query(`SELECT COUNT(KB) as count FROM knowledgeBase WHERE KB = ${kbarticle};`, function (err, result) {
          if (result.rows[0].count == 1) {
               connection.query(`UPDATE KnowledgeBase SET title = '${title}',description = '${knowledge}' WHERE KB = ${kbarticle};`);
          } else {
               connection.query(`INSERT INTO KnowledgeBase VALUES(${kbarticle},'${title}','${knowledge}');`);
          }
     });
     update_counters();
     res.redirect(path.join('/backlog'));
});

//KB list
app.get('/all_kb', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query("SELECT * FROM KnowledgeBase;", function (err, result) {
               connection.query("SELECT COUNT(*) AS count FROM KnowledgeBase;", function (err, first) {
                    res.render(path.join(__dirname, '/views/kblist'), {
                         title: 'KnowledgeBase', data: result.rows, count: first.rows[0], user: user_data
                    });
               });
          });
     }
});


//all user's incidents
app.get('/my_inc', (req, res) => {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT * FROM ticket WHERE assigned = "${user_data.username}";`, function (err, result) {
               connection.query("SELECT COUNT(*) AS count FROM KnowledgeBase;", function (err, first) {
                    if (result != undefined) {
                         res.render(path.join(__dirname, 'views/kblist'), { title: 'Incidents', count: first.rows[0], user: user_data, data: result.rows })
                    } else {
                         res.render(path.join(__dirname, '/views/kblist'), { title: 'No pending incidents', count: first.rows[0], user: user_data, data: null })
                    }
               });
          });
     }
});


//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));
