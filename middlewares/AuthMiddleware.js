module.exports = async (req, res, next) => {
    const { session } = req
    const url = req.originalUrl

    switch(url) {
        default:
            if (!session.user) {
                res.redirect('/login')
                return
            }
            break
        case '/login':
            if (session.user) {
                res.redirect('/')
                return
            }
            break
        case 'register':
            if (session.user) {
                res.redirect('/')
                return
            }
            break
    }
    
    next()
}

console.log('[MIDDLE] Initialized AuthenticationMiddleware!')