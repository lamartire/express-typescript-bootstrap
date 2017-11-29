import * as http from 'http'
import * as express from 'express'
import * as path from 'path'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import AppError from './lib/appError'
import indexRoute from './routes/index'
import IAppError from './types/IAppError'

const port = process.env.PORT || '3000'
const app = express()
const server = http.createServer(app)

app.set('port', port)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use('/', indexRoute)
app.use((req, res, next) => {
  const err: IAppError = new AppError('Not Found')

  err.status = 404

  next(err)
})
app.use((err: IAppError, req: express.Request, res: express.Response, next: Function) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

export default server
