const express = require("express")

const router = express.Router()

router.get('/', (req, res) => {
    res.render('auth-signin-cover');
})

router.get('/dash', (req, res) => {
    res.render('admin');
})

module.exports = router