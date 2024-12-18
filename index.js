const express = require("express");
const path = require('path');
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const { escape } = require("validator");
const { connectionDB } = require("./config/db")

//configure env
dotenv.config();

//rest object
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
// Configure session middleware
app.use(
    session({
      secret: process.env.SESSION_KEY, // A secret key to sign the session ID cookie (make this a strong, random string)
      resave: false, // Prevent session from being saved back to the session store if unmodified
      saveUninitialized: true, // Save uninitialized session (session that is new, but not modified)
      cookie: {
        secure: false, // Set to true if using HTTPS (if you move to production, set to true)
        maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (e.g., 1 day)
      },
    })
  );
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

//routes
// app.use(router)
app.use('/Home', require('./routes/userRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 8086;
app.listen(PORT, function(){
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})
connectionDB()