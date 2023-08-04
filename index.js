
//imports
const sql = require('./sql');
const express = require('express');
const path = require('path');
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require("express-session");
const app = express();

var port = process.env.PORT || 5000;

// Engine
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

// statics
app.use('/styles', express.static(__dirname + "/styles"));
app.use('/static', express.static(__dirname + '/static'));

// express configuration
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express cookies and session configuration
app.use(cookieParse())
app.use(session({
     secret: 'secret-key',
     resave: false,
     saveUninitialized: true

}));

//User data
export const user_data = {
     username: '',
     realname: '',
     email: ''
}

// routes declaration
const Login = require('./Routes/Login');
const Backlog = require('./Routes/Backlog');
const OpenTicket = require('./Routes/OpenTicket');
const NewTicket = require('./Routes/NewTicket');
const KnowledgeBase = require('./Routes/KnowledgeBase');
const KnowleadgeCreate = require('./Routes/KnowledgeCreate');
const MyInsidents = require('./Routes/MyInsidents');

// express routing
app.use('/', Login);
app.use('/backlog', Backlog);
app.use('/ticket/:id', OpenTicket);
app.use('/ticket_create', NewTicket);
app.use('/knowleadge_create', KnowleadgeCreate);
app.use('/knowledgebase/:id', KnowledgeBase);
app.use('/myInsidents', MyInsidents);


//Server start url
app.listen(port, () => console.info(`http://localhost:${port}`));



// app.post('/search', (req, res) => {
//      if (user_data.username === '') {
//           res.redirect(path.join('/'))
//      } else {
//           const { Search } = req.body
//           const [word, digit] = Search.split(/(?<=\D)(?=\d)/);

//           switch (word) {
//                case 'KB':
//                     search_kb = parseInt(digit);
//                     connection.query(`SELECT * FROM knowledgeBase WHERE KB = ${search_kb};`, function (err, first) {
//                          res.render(path.join(__dirname, '/views/kbarticle'), { data: first.rows[0], user: user_data });
//                     });
//                     break;
//                case 'INC':
//                     search_ticket = parseInt(digit);
//                     connection.query("SELECT COUNT(*) as count FROM KnowledgeBase;", function (err, first) {
//                          connection.query("SELECT * FROM KnowledgeBase;", function (err, second) {
//                               connection.query("SELECT COUNT(username) as count FROM admin;", function (err, third) {
//                                    connection.query("SELECT username FROM admin;", function (err, forth) {
//                                         connection.query(`SELECT * FROM ticket WHERE id = ${search_ticket};`, function (err, final) {
//                                              res.render(path.join(__dirname, '/views/ticket'), {
//                                                   data: final.rows[0], user: user_data,
//                                                   KB: second.rows, count: first.rows[0].count,
//                                                   user_count: third.rows[0].count, users: forth
//                                              });
//                                         });
//                                    });
//                               });

//                          });
//                     })
//                     break;
//           }
//      }
// })






// app.get('/all_inc', function (req, res) {
//      if (user_data.username === '') {
//           res.redirect(path.join('/'))
//      } else {
//           connection.query("SELECT * FROM Ticket;", function (err, result) {
//                connection.query("SELECT COUNT(*) AS count FROM Ticket;", function (err, first) {
//                     res.render(path.join(__dirname, '/views/kblist'), {
//                          title: 'Incidents', data: result.rows, count: first.rows[0], user: user_data
//                     });
//                });
//           });
//      }
// });
