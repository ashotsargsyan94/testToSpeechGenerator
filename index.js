const express = require("express")
const serverRoutes = require('./routes/servers.js')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname));
app.set('view engine', 'ejs')
app.use(serverRoutes.router)
app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify(req.body, null, 2))
})
app.listen(3000, () => {

})
