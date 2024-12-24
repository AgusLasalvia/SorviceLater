
//imports
const express = require('express');
const cookieParse = require('cookie-parser');
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

const user_data = {
	username: '',
	realname: '',
	email: ''
}
//User data
exports.user_data = user_data;

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
