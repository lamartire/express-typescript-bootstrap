import server from './server'
import * as debug from 'debug'
import * as http from 'http'
import chalk from 'chalk'

const appDebugger = debug('time-flow-api:server')
const port = process.env.PORT || '3000'

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError (error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(chalk.red(`${bind} is already in use`))
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`

  appDebugger(`Listening on ${bind}`)
}
