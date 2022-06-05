const express = require('express');
const app = express();
const path = require('path')


//Setting
app.set('port', 3000);

// app.listen(300, () => {
//     console.log('hola')
// })

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'views/index.html'));
    //res.sendFile(path.join(__dirname, 'views/index.html'));

});