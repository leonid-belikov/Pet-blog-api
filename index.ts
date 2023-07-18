import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './router'
import mongoose from 'mongoose'

dotenv.config()

const app: Express = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

app.use('/api', router)

const errorHandler = (err: Error, req: Request, res: Response) => {
  console.log( 'errorHandler:', err.message)
  res.status(500).send(err.message)
}

app.use(errorHandler)

async function start() {
  const uri = process.env.DB_URI as string

  try {
    await mongoose.connect(uri)
      .then(() => {
        console.log('Database connected ...')
      })
      .catch(e => {
        console.log('Database connect error:', e)
        throw e
      })

    app.listen(port, () => {
      console.log(`Server is running at localhost:${port}`)
    })
  } catch (e) {
    console.log('Error while starting:', e)
    process.exit(1)
  }
}

start()
