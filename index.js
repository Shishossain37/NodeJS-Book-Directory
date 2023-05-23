const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const api = require('./routes/api')
const PORT = 8000
app.use(bodyParser.json())
app.use('/api/v1', api)
app.listen(PORT, () => console.log(`App is listennig on ${PORT}`))