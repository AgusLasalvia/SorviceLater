const path = require('path');
const express = require('express');
const app = express();
const sql = require('mysql');

//connection SQL
sql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234',
  database: 'tickets'
});

app.listen(8080, () => {
  console.log('Server start on port 8080');
});

//routes
app.get('/', (recuest, response) => {
  response.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/profile', (recuest, response) => {
  response.sendFile(path.join(__dirname, '/views/profile.html'));
});
