const express = require("express");
const path = require('path');
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const { escape } = require("validator");
const { connectionDB } = require("./config/db");
const configureSession = require('./Middlewares/sessionConfig');

//configure env
dotenv.config();

//rest object
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
configureSession(app);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

//routes
// app.use(router)
app.get('/', (req, res) => {
    res.render('index1');
});
app.use('/Home', require('./routes/userRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5004;
app.listen(PORT, function(){
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})
connectionDB()
