const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json('home')
})
 
module.exports = router

console.log('[ROUTER] Initialized GenericRouter!')