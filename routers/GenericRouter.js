const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/AuthMiddleware')
const Boards = require('../controllers/Boards')

router.get('/', Auth.isAuthenticated, async (req, res) => {
    const { session } = req
    const boards = await Boards.getAllFromUser(session.user.id)
    res.render('home', { user: session.user, boards: boards.data })
})
 
module.exports = router

console.log('[ROUTER] Initialized GenericRouter!')