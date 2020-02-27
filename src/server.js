require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.listen(3000, () => console.log('server started'))

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database'))

mongoose.connect(process.env.DB_Connection_String, {
    useNewUrlParser: true,
});

app.use(express.json())

const subscribersRouter = require('./api/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('server started'))