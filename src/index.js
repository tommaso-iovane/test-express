import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import userRoutes from './routes/users.routes.js'

const port = process.env.PORT || 3000
const app = express()


// standard middlewares
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({extended: false, limit: '5mb'}))
app.use(compression())
app.enable('trust proxy')
app.use(cookieParser(process.env.COOKIE_SECRET || 'my-precious-and-safe-cookie-secret'))
app.use(helmet())

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    res.header('Pragma', 'no-cache')

    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, credentials, mode, X-sessid')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH')
    if (process.env.IGNORE_CORS === 'TRUE' || process.env.CORS_ORIGINS.split(',').includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
    }

    next()
})

app.use(session({
    secret: process.env.SESSION_SECRET || 'my-precious-and-safe-session-secret',
    resave: false,
    saveUninitialized: false
}))


app.get('/', (_req, res) => {
    res.send(`
        <h1>Welcome</h1>
        <a href="/api/users">Click me</a>    
    `)
})


app.use('/api/users', userRoutes)


app.listen(port, () => {
    console.log(`server started on port: ${port}`)
})
