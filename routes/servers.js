const Router = require("express").Router;
const listVoices = require("../controllers/textToSpeech.js");
const {getData} = require("../controllers/textToSpeech");

const router = Router();


// router.get('/getData', getData)
router.post('/getVoice', getData)
router.get('/', (req, res) => {
    listVoices.listVoices().then(function (data) {
        res.render('index', {
            "options": data.options,
            "types": data.types
        })
    });

})
module.exports = {
    router: router
}
