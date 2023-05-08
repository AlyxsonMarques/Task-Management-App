const dotenv = require('dotenv').config()

const express = require('express')
const app = express()

const router = require('./routers/router')

app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
