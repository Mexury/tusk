const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        success: false
    })
})

module.exports = router

console.log('[ROUTER] Initialized ApiRouter!')