const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/AuthMiddleware')
const Boards = require('../controllers/Boards')

router.get('/', Auth.isAuthenticated, async (req, res) => {
    const { session } = req
    const boards = await Boards.getAllFromUser(session.user.id)
    res.render('home', { user: session.user, boards: boards.data })
})

router.get(['/view', '/view/:share_id'], Auth.isAuthenticated, async (req, res) => {
    const { session, params } = req

    if (!params.share_id) {
        res.redirect('/')
        return
    }

    const board = await Boards.getByShareId(params.share_id)
    if (!board.success) {
        res.redirect('/')
        return
    }

    console.log(board);

    res.render('board', { user: session.user, board: board.data })
})

module.exports = router

console.log('[ROUTER] Initialized GenericRouter!')