require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello, world!')
 })


    app.use((error, req, res, next) => {
      let response
      if (process.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error' }}
      } else {
        response = { error }
      }
      res.status(500).json(response)
    })



module.exports = app