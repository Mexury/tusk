const express = require('express')
const router = express.Router()
const Users = require('../controllers/Users')
const Response = require('../helpers/Result')
const Auth = require('../middlewares/AuthMiddleware')

router.get('/logout', Auth.isAuthenticated, (req, res) => {
    const { session } = req
    session.destroy()
    res.render('auth/logout')
})

router.get('/login', Auth.isNotAuthenticated, (req, res) => {
    res.render('auth/login')
})

router.post('/login', async (req, res) => {
    const { body, session } = req
    const { email, password } = body

    
    if (email.isNullOrEmpty() || password.isNullOrEmpty()) {
        // Error: Please fill in all fields!
        res.json(new Response(false, null, 'Please fill in all fields!'))
        return
    }
    
    const user = await Users.validate(email, password)
    if (user.success) {
        // The user exists
        session.user = user.data
        res.json(new Response(true, user.data, null))
        return
    }
    // Error: Email or password is incorrect.
    res.json(new Response(false, null, 'Email or password is incorrect.'))
})

router.get('/register', Auth.isNotAuthenticated, (req, res) => {
    res.render('auth/register')
})
 
module.exports = router

console.log('[ROUTER] Initialized AuthRouter!')