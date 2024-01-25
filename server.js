const express = require('express')
const dotenv = require('dotenv')
const app = express()
const session = require('express-session')
dotenv.config()

// Define middlewares
const AuthMiddleware = require('./middlewares/AuthMiddleware')

// Define routes
const ApiRouter = require('./routers/ApiRouter')
const AuthRouter = require('./routers/AuthRouter')
const GenericRouter = require('./routers/GenericRouter')

const PORT = process.env.PORT || 3000

// Add express support for templating engines.
app.set('view engine', 'ejs')

// Add express support for different request body types.
app.use(express.raw({ limit: '4mb' }))
app.use(express.json({ limit: '4mb' }))

// Make express use /public as a static resource source.
app.use(express.static('public'))

// Add express support for sessions
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))

// Initialize controllers
const Users = require('./controllers/Users')

// Initialize middlewares
app.use(AuthMiddleware)

// Initialize routes
app.use('/api', ApiRouter)
app.use('/', AuthRouter)
app.use('/', GenericRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`[SERVER] Listening on http://localhost:${PORT}`)
})

const main = async () => {
    // console.log(await Users.register('Albert Lourensen', 'albertlourensen@hotmail.com', '12345'))
    // console.log(await Users.exists('albertlourensen@hotmail.com'))
}

main()