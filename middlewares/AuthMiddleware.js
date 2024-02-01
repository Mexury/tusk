const isAuthenticated = async (req, res, next) => {
    const { session } = req

    if (session && session.user) {
        next()
        return
    }
    res.redirect('/login')
}

const isNotAuthenticated = async (req, res, next) => {
    const { session } = req

    if (session && session.user) {
        res.redirect('/')
        return
    }
    next()
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated
}