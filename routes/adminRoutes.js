const express = require("express")
const authController = require('../controllers/authController');
const AuthController = new authController();
const router = express.Router()

// Registration route
router.post('/register', AuthController.register.bind(AuthController));

// Login route
router.post('/login', AuthController.login.bind(AuthController));

router.get('/', (req, res) => {
    res.render('auth-signin-cover');
})

router.get('/dash', (req, res) => {
    res.render('admin');
})

module.exports = router