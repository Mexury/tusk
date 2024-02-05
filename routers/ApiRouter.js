const express = require('express')
const Boards = require('../controllers/Boards')
const router = express.Router()
const Response = require('../helpers/Result')

router.get('/boards', async (req, res) => {
    if (!session.user) {
        // Not authenticated
        res.json(new Response(false, null, 'Not authenticated.'))
        return
    }
    const result = await Boards.getAllFromUser()
    res.json(result)
})

router.post('/boards', async (req, res) => {
    const { body, session } = req
    const { board_name, board_note } = body

    if (!session.user) {
        // Not authenticated
        res.json(new Response(false, null, 'Not authenticated.'))
        return
    }

    if (board_name.isNullOrEmpty()) {
        // Please fill in the board name.
        res.json(new Response(false, null, 'Please fill in the board name.'))
        return
    }

    const result = await Boards.create(session.user.id, board_name, board_note)
    res.json(result)
})

module.exports = router

console.log('[ROUTER] Initialized ApiRouter!')