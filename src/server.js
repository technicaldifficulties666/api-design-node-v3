import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import { router } from './resources/item/item.router'
export const app = express()

// middleware
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// mount item router
app.use(router)

// route controllers
// READ
/* app.get('/item', (req, res) => {
  res.send({ message: 'for now' })
})

// UPDATE
app.put('/item', (req, res) => {
  console.log(req.body)
})

// CREATE
app.post('/item', (req, res) => {
  console.log(req.body)
  res.send({ ok: 'true' })
})

// DESTROY
app.delete('/item', (req, res) => {
  console.log(req.body)
  res.send({ status: 'deleted' })
}) */

// start server
export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
