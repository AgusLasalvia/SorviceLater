//imports
const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const port = 3000

const connection = mysql.createConnection({
     host :"localhost",
     user: "root",

})

//statics
app.use('/styles', express.static(__dirname + "/styles"))
app.use('/js', express.static(__dirname + '/js'))
app.use('/static', express.static(__dirname + '/static'))


app.get('', (req, res) => {
     res.sendFile(path.join(__dirname, '/Templates/login.html'))
})
app.post('', async (req, res) => {
     const { username, password } = req.body
     
})
app.get('/menu', (req, res) => {
     res.sendFile(path.join(__dirname, '/Templates/menu.html'))
})

app.listen(port, () => console.info(`http://localhost:${port}`))
