//CREATING APPLICATION
const express = require("express");
const app = express();
//MIDDLEWARE
// app.use(express.json());


// create application/x-www-form-urlencodeds parser

//THE CONNECTION TO ROUTER
const bidhaaRouter = require("./router/bidhaa")
const madeniRouter = require("./router/madeni")
    //DIRECTING REQUESTS TO THE ROUTER
app.use("/duka/v1/bidhaa", bidhaaRouter)
app.use("/duka/v1/madeni", madeniRouter)
    // app.use("/form", WaytoRouter)


//EXPORTING APPLICATION
exports.app = app;