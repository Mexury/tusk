const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.json('register')
})
 
module.exports = router

console.log('[ROUTER] Initialized AuthRouter!')