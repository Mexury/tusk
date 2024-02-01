const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/AuthMiddleware')

router.get('/', Auth.isAuthenticated, (req, res) => {
    const { session } = req
    res.render('home', { user: session.user })
})
 
module.exports = router

console.log('[ROUTER] Initialized GenericRouter!')