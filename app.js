require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mainRouter = require('./route/main')


const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1',mainRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const start = ()=>{
    try {
        app.listen(PORT,console.log(`Server is running on ${PORT}`))
    } catch (error) {
        console.group(error)
    }
}
start()