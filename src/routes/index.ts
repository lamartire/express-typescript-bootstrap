import * as express from 'express'

const router = express.Router()

router.get('/favicon.ico', (req: express.Request, res: express.Response) => {
  res.status(204)
})

router.get('/', (req: express.Request, res: express.Response, next: Function) => {
  res.json({
    app: true
  })
})

export default router
