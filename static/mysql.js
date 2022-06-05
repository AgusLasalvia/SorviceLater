const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Service'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connection successful");
});

function add_ticket(person,description) {
  connection.query('INSER INTO ticket VALUES(${ticket_number},${person},${description});')
}

function search_ticket(number ,person) {
  if (number == 0) {
    connection.query('SELECT FROM ticket WHERE person = ${person}', (err, rows) => {
      if (err) throw err
      console.log(rows[0])
    })
  } else if (person == null) {
    connection.query("SELECT FROM ticket WHERE person = ${number}", (err, rows) => {
      if (err) throw err;
      console.log(rows[0]);
    });
  } else {
    // console.log('error, no information given')
  }
}

function update_ticket() {
  
}