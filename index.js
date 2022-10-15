//imports
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var port = process.env.PORT || 5000;


// Database connection
const connection = mysql.createConnection({
     host: "ec2-44-209-24-62.compute-1.amazonaws.com",
     user: "gnoellfbbbujkx",
     password: "0fd585265a9e50e6a4965f9af22d5f18c49cf32dbda5ff0c29d437060cd4cd2d",
     database: "da1eroecl12e1b",
     port: 5432
});

var handleKFDisconnect = function () {
     kfdb.on('error', function (err) {
          if (!err.fatal) {
               return;
          }
          if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
               console.log("PROTOCOL_CONNECTION_LOST");
               throw err;
          }
          log.error("The database is error:" + err.stack);

          kfdb = mysql.createConnection(connection);

          console.log("kfid");

          console.log(kfdb);
          handleKFDisconnect();
     });
};
handleKFDisconnect();



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
const new_BK = {
     KB: 0,
     title: '',
     description: ''
}
let kb_id = 0;
let search_kb = 0;



//Important functions
update_counters = () => {
     connection.query('SELECT COUNT(*) as count FROM ticket WHERE status = "resolved";', function (err, resolved) {
          data.Resolve = resolved[0].count;
          connection.query('SELECT COUNT(*) as count FROM ticket WHERE status = "new";', function (err, t_new) {
               data.New = t_new[0].count;
               connection.query('SELECT COUNT(*) as count FROM ticket WHERE status = "pendingVendor" AND status = "pendingAdmin";', function (err, progress) {
                    data.Pending = progress[0].count
               });
          });
     });
};


//Home(login) Route
app.get('/', function (req, res) {
     user_data.username = ""
     res.render(path.join(__dirname, '/views/login'), { text: '' });

});

app.post('/', function (req, res) {
     update_counters();
     const { username, password } = req.body
     connection.query(`SELECT * FROM admin WHERE username = "${username}" AND password = "${password}"`, function (err, result) {
          if (result[0] == undefined) {
               res.render(path.join(__dirname, '/views/login'), { text: 'Username or password not correct' })
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
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          update_counters();
          res.render(path.join(__dirname, '/views/backlog'), { user: user_data, data: data });
     }
});

app.post('/search', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          const { Search } = req.body
          const [word, digit] = Search.split(/(?<=\D)(?=\d)/);

          switch (word) {
               case 'KB':
                    search_kb = parseInt(digit);
                    connection.query(`SELECT * FROM knowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
                         res.render(path.join(__dirname, '/views/kbarticle'), { data: first[0], user: user_data });
                    });
                    break;
               case 'INC':
                    search_ticket = parseInt(digit);
                    connection.query('SELECT COUNT(*) as count FROM KnowledgeBase;', function (err, first) {
                         connection.query('SELECT * FROM KnowledgeBase;', function (err, second) {
                              connection.query('SELECT COUNT(username) as count FROM admin;', function (err, third) {
                                   connection.query('SELECT username FROM admin;', function (err, forth) {
                                        connection.query(`SELECT * FROM ticket WHERE id = ${search_ticket};`, function (err, final) {
                                             res.render(path.join(__dirname, '/views/ticket'), {
                                                  data: final[0], user: user_data,
                                                  KB: second, count: first[0].count,
                                                  user_count: third[0].count, users: forth
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
app.get('/ticket_create', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT COUNT(*) AS count FROM Ticket;`, function (err, result) {
               ticket_id = result[0].count;
               ticket_id += 1;
               new_ticket.id = ticket_id
               connection.query('SELECT COUNT(*) as count FROM KnowledgeBase;', function (err, first) {
                    connection.query('SELECT * FROM KnowledgeBase;', function (err, second) {
                         connection.query('SELECT COUNT(username) as count FROM admin;', function (err, third) {
                              connection.query('SELECT username FROM admin;', function (err, forth) {
                                   res.render(path.join(__dirname, '/views/ticket'), {
                                        data: new_ticket, user: user_data,
                                        KB: second, count: first[0].count,
                                        user_count: third[0].count, users: forth
                                   });
                              });
                         });
                    });
               });
          });
     }
});



//Tickets Route
app.get('/ticket', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT * FROM ticket WHERE id = ${search_ticket};`, function (err, first) {
               connection.query('SELECT COUNT(username) as count FROM admin;', function (err, second) {
                    connection.query('SELECT username FROM admin;', function (err, third) {
                         res.render(path.join(__dirname, '/views/ticket'), { data: first[0], users: third, user_count: second[0].count, KB: kb });
                    })
               })
          })
     }
})


//Ticket Modification
app.post('/ticket', function (req, res) {
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
          if (result[0].count == 1) {
               connection.query(`UPDATE Ticket SET request_by = "${reqBy}",\
          request_for = "${reqFor}",service_offering = "${srvcOf}",\
          item = "${confItem}",contact_type = "${contactType}",\
          status = "${State}",assigned = "${Assigned}",\
          category = "${Category}",symptom = "${Symptom}",\
          impact = "${Impact}",urgency = "${Urgency}",priority = "${Priority}",\
          description = "${Description}",KB = ${Kb},worknotes = "${worknotes}",\
          additional = "${addcomments}" WHERE id = ${incNum};`);
               ;
          } else {
               connection.query(`INSERT INTO Ticket VALUES(${incNum},"${reqBy}",\
          "${reqFor}","${srvcOf}","${confItem}","${contactType}",\
          "${State}","${Assigned}","${Category}","${Symptom}",\
          "${Impact}","${Urgency}","${Priority}","${Description}",${Kb},"${user_data.username}:  ${worknotes}",\
          "${user_data.username}:  ${addcomments}");`);

          }
     });
     update_counters();
     res.redirect(path.join('/backlog'));
});

app.get('/all_inc', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query('SELECT * FROM Ticket;', function (err, result) {
               connection.query('SELECT COUNT(*) AS count FROM Ticket;', function (err, first) {
                    res.render(path.join(__dirname, '/views/kblist'), {
                         title: 'Incidents', data: result, count: first[0], user: user_data
                    });
               });
          });
     }
});


//KnowledgeBase Routes
app.get('/kb_create', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, result) {
               kb_id = result[0].count;
               kb_id += 1;
               new_BK.KB = kb_id
               res.render(path.join(__dirname, '/views/kbarticle'), { data: new_BK, user: user_data });
          })
     }
});

app.get('/kbarticle', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT * FROM knowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
               res.render(path.join(__dirname, '/views/kbarticle'), { data: first[0], user: user_data });
          })
     }
});

app.post('/kbarticle', function (req, res) {
     const { kbarticle, title } = req.body
     const knowledge = req.body.knowledge
     connection.query(`SELECT COUNT(KB) as count FROM knowledgeBase WHERE KB = ${kbarticle};`, function (err, result) {
          if (result[0].count == 1) {
               connection.query(`UPDATE KnowledgeBase SET title = "${title}",description = "${knowledge}" WHERE KB = ${kbarticle};`);
          } else {
               connection.query(`INSERT INTO KnowledgeBase VALUES(${kbarticle},"${title}","${knowledge}");`);
          }
     });
     update_counters();
     res.redirect(path.join('/backlog'));
});

//KB list
app.get('/all_kb', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query('SELECT * FROM KnowledgeBase;', function (err, result) {
               connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, first) {
                    res.render(path.join(__dirname, '/views/kblist'), {
                         title: 'KnowledgeBase', data: result, count: first[0], user: user_data
                    });
               });
          });
     }
});


//all user's incidents
app.get('/my_inc', function (req, res) {
     if (user_data.username === '') {
          res.redirect(path.join('/'))
     } else {
          connection.query(`SELECT * FROM ticket WHERE assigned = "${user_data.username}";`, function (err, result) {
               connection.query('SELECT COUNT(*) AS count FROM KnowledgeBase;', function (err, first) {
                    if (result != undefined) {
                         res.render(path.join(__dirname, 'views/kblist'), { title: 'Incidents', count: first[0], user: user_data, data: result })
                    } else {
                         res.render(path.join(__dirname, '/views/kblist'), { title: 'No pending incidents', count: first[0], user: user_data, data: null })
                    }
               });
          });
     }
});

// app.post('get_ticket',function(req,res){

// )

//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));
