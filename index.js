const express = require('express')
const serverRoutes = require('./routes/servers.js')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname));
app.set('view engine', 'ejs')
app.use(serverRoutes.router)
app.listen(process.env.PORT, () => {
    console.log('Server listening on Port', process.env.PORT);
})
