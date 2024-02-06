const express = require('express')
const Boards = require('../controllers/Boards')
const Tasks = require('../controllers/Tasks')
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

    try {
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
    } catch (error) {
        res.json(new Response(false, null, error))
        return
    }

    const result = await Boards.create(session.user.id, board_name, board_note)
    res.json(result)
})


router.post('/tasks', async (req, res) => {
    const { body, session } = req
    const { board_id, task_name, task_note } = body

    try {
        if (!session.user) {
            // Not authenticated
            res.json(new Response(false, null, 'Not authenticated.'))
            return
        }

        // CHECK IF BOARD BELONGS TO USER
    
        if (task_name.isNullOrEmpty()) {
            // Please fill in the board name.
            res.json(new Response(false, null, 'Please fill in the task name.'))
            return
        }
    } catch (error) {
        console.log(error);
        res.json(new Response(false, null, error))
        return
    }

    const result = await Tasks.create(board_id, task_name, task_note)
    res.json(result)
})


module.exports = router

console.log('[ROUTER] Initialized ApiRouter!')