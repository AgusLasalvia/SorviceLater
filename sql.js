const sql = require("mysql");
const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "<PASSWORD>",
    database: "test"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

let data = {
    Resolved: 0,
    New: 0,
    Pending: 0
};

function updateCounter() {
    connection.query("SELECT COUNT(*) FROM ticket WHERE status = 'resolved';", function (err, resolved) {
        if (err) throw err;
        console.log(resolved.row[0].count);
        data.Resolved = resolved.row[0].count;     
    });
    connection.query("SELECT COUNT(*) FROM ticket WHERE status = 'new';", function (err, newTicket) {
        if (err) throw err;
        console.log(newTicket.row[0].count);
        data.New = newTicket.row[0].count;
    });
    connection.query("SELECT COUNT(*) FROM ticket WHERE status = 'pending';", function (err, pendingTicket) {
        if (err) throw err;
        console.log(pendingTicket.row[0].count);
        data.Pending = pendingTicket.row[0].count;
    });
    return data;
};

function userVerification(username, password) {
    connection.query(`SELECT * FROM admin WHERE username = '${username}' AND password = '${password}';`, function (err, response) {
        if (err) throw err;
        if (response.row[0].username === undefined) return false;
        else return true;
    })
};


function getAllAdmin() {
    connection.query("SELECT username,COUNT(*) FROM admin;", function (err, admin) {
        if (err) throw err;
        console.log(admin);
        return admin.rows
    });
};

function getTicketCounter() {
    connection.query("SELECT COUNT(*) FROM ticket;", function (err, ticket) {
        if (err) throw err;
        console.log(ticket.row[0].count);
        return ticket.row[0].count
    });
};


function getAllKnowledgeBase() {
    connection.query("SELECT *,COUNT(*) FROM knowledgebase;", function (err, knowledgebase) {
        if (err) throw err;
        console.log(knowledgebase);
        return knowledgebase.rows
    });
};


function getSpecificTicket(id) { 
    connection.query(`SELECT * FROM ticket WHERE id = ${id};`, function (err, ticket) {
        if (err) throw err;
        console.log(ticket);
        return ticket.rows
    });
};


function insertNewTicket(ticket, user_data) {
    const { incNum, reqBy, reqFor, srvcOf,
        confItem, contactType, State,
        Assigned, Category, Symptom, Impact,
        Urgency, Description, Kb } = ticket;
    const worknotes = ticket.worknotes
    const addcomments = ticket.addcomments
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
    })
};


function getKnowledgeCounter() {
    connection.query("SELECT COUNT(*) FROM knowledgebase;", function (err, knowledgebase) {
        if (err) throw err;
        console.log(knowledgebase.row[0].count);
        return knowledgebase.row[0].count
    });
};

function getSpecificKnlowledgeBase(id) {
    connection.query(`SELECT * FROM knowledgebase WHERE KB = ${id};`, function (err, knowledgebase) {
        if (err) throw err;
        console.log(knowledgebase);
        return knowledgebase.rows[0]
    });
};

function getAllKnowledgeBase() {
    connection.query("SELECT *,COUNT(*) FROM knowledgebase;", function (err, knowledgebase) {
        if (err) throw err;
        console.log(knowledgebase);
        return knowledgebase.rows
    });
};

function verifyExistingKnowledge(knowledge) {
    connection.query(`SELECT COUNT(KB) as count FROM knowledgebase WHERE KB = ${knowledge};`, function (err, result) {
        if (err) throw err
        if (result.rows[0].count == 1) {
            return true
        } else {
            return false
        }
    })
};


function insertNewKnowledgeBase(knowledgebase, title, article) { 
    connection.query(`INSERT INTO knowledgebase VALUES(${article},'${title}',\
      '${knowledgebase}');`, function (err) { 
        if (err) throw err;
    });
};

function updateKnowledgeBase(knowledgebase, title, article) { 
    connection.query(`UPDATE knowledgebase SET title = '${title}',\
      article = '${knowledgebase}' WHERE KB = ${article};`, function (err) { 
        if (err) throw err;
    });
};


function getAllMyIncidents(username) {
    connection.query(`SELECT * FROM tickets WHERE username = '${username}';`, function (err,response) {
        if (err) throw err;
        return response.rows
    })
};

module.exports = {
    getAllMyIncidents,
    updateKnowledgeBase,
    insertNewKnowledgeBase,
    verifyExistingKnowledge,
    getAllKnowledgeBase,
    updateCounter,
    userVerification,
    getAllAdmin,
    getTicketCounter,
    getSpecificTicket,
    insertNewTicket,
    getKnowledgeCounter,
    getSpecificKnlowledgeBase

}