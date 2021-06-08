const express = require("express");
const router = express.Router();
let bodyParser = require('body-parser')
const { kukopaPage, wekaWadaiwa, payment, kwaMajina } = require(`${__dirname}/../controllers/madeni`)
router.route("/")
    .get(kukopaPage)
    .post(bodyParser.urlencoded({ extended: false }), wekaWadaiwa)
router.route("/payment")
    .post(bodyParser.urlencoded({ extended: false }), payment)
router.route("/kwaMajina")
    .post(bodyParser.urlencoded({ extended: false }), kwaMajina)
module.exports = router;