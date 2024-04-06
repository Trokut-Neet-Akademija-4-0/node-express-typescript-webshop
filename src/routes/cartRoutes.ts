import express, { Request, Response } from 'express'
import cartService from '../services/cartService'

const router = express.Router()

// dohvat cije kosarice
router.get('/', (req: Request, res: Response) => {
  res.send(cartService.getCart())
})

// dodavanje proizvoda na kosaricu pomocu product id-a
router.get('/add/:productId', (req: Request, res: Response) => {
  res.send(
    cartService.addProductById(Number.parseInt(req.params.productId, 10)),
  )
})

// skidanje produkta sa kosarice pomocu product id-a
router.delete('/remove/:productId', (req: Request, res: Response) => {
  res.send(
    cartService.deleteProductById(Number.parseInt(req.params.productId, 10)),
  )
})

export default router
