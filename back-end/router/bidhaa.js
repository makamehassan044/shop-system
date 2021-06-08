//CREATING ROUTER
const express = require("express");
const router = express.Router();
//REQUIRING CONTROLLERS
const { wekaBidhaa, leteBidhaaZote, leteBidhaaHii, mapato, zote } = require(`${__dirname}/../controllers/bidhaa`);
//ROUTING REQUESTS TO THEIR CONTROLLERS
//BASIC CRUD OPERATIONS
// let urlencodedParser = bodyParser.urlencoded({ extended: false })
// const { urlencodedParser } = require(`${__dirname}/../app`)
let bodyParser = require('body-parser')
router.route("/")
    .get(leteBidhaaZote) //form page ya bidhaa
    .post(bodyParser.urlencoded({ extended: false }), wekaBidhaa);
router.route("/zote")
    .get(zote)

router.route("/kwaTarehe")
    .post(bodyParser.urlencoded({ extended: false }), leteBidhaaHii)
    // .patch(() => {
    //     console.log(`rekebishaBidhaaHii`);
    // })
    .delete(() => {
        console.log(`futaBidhaaHii`);
    })
    // router.route("/mapato")
    //     .get(mapato)
    //EXPORTING ROUTER:
module.exports = router;