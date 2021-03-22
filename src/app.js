require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {CLIENT_ORIGIN} = require('./config');
const { NODE_ENV } = require('./config')
const sessionsRouter = require('./sessions/sessions-router')
const foldersRouter = require('./folders/folders-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);



app.use('/api/folders', foldersRouter)
app.use('/api/sessions', sessionsRouter)

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