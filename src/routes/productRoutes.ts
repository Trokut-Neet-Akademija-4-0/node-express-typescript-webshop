import express, { Request, Response } from 'express'
import productService from '../services/productService'

const router = express.Router()

// dohvacanje svih produkta kao liste
router.get('/', (req: Request, res: Response) => {
  res.send(productService.getAllProducts())
})

// dohvacanje jednog produkta kao detalji produkta pomocu product id-a
router.get('/:id', (req: Request, res: Response) => {
  res.send(productService.getProductById(Number.parseInt(req.params.id, 10)))
})

export default router
