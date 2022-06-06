const path = require('path');
const express = require('express');
const app = express();


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