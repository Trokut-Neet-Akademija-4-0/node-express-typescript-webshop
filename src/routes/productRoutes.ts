import express from 'express'
import {
  addProductPictures,
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../controllers/productController'

const router = express.Router()

// dohvacanje svih produkta kao liste
router.get('/', getAllProducts)
// dohvacanje jednog produkta kao detalji produkta pomocu product id-a
router.get('/:id', getProductById)

router.put('/:id', updateProductById)

router.delete('/:id', deleteProductById)

router.post('/', createProduct)

router.post('/:id/pictures', addProductPictures)

export default router
