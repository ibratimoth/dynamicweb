// sessionConfig.js
const session = require('express-session');
require('dotenv').config();

module.exports = function configureSession(app) {
    app.use(
        session({
            secret: process.env.SESSION_KEY, // A secret key to sign the session ID cookie
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
                maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
            },
        })
    );
};
