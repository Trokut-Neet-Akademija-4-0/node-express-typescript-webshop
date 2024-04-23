import { Request, Response } from 'express'
import productService from '../services/productService'
import Proizvod from '../entities/Proizvod'

const getAllProducts = async (req: Request, res: Response) => {
  res.send(await productService.getAllProducts())
}

const getProductById = (req: Request, res: Response) => {
  res.send(productService.getProductById(Number.parseInt(req.params.id, 10)))
}

const createProduct = async (req: Request, res: Response) => {
  const newProduct = req.body as Proizvod
  res.send(await productService.addNewProduct(newProduct))
}

export { getAllProducts, getProductById, createProduct }
