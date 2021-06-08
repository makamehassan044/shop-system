//READING config.env file
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const appPort = process.env.APP_PORT;
const DB = process.env.DATABASE_LOCAL;
const dbPort = process.env.DB_PORT;
//REQUIRING APPLICATION
const { app } = require('./app');
//CREATING APPLICATION SERVER
app.listen(appPort, "127.0.0.1", () => {
    console.log(`APPLICATION SERVER IS NOW RUNNING, PORT NUMBER IS ${appPort}`);
});
//CREATING  DATABASE SERVER
const mongoose = require('mongoose');
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`DATABASE SERVER IS NOW RUNNING, PORT NUMBER IS ${dbPort}`);
}).catch(err => console.log(`DATABASE SERVER CONNECTION ERROR ---> ${err}`));