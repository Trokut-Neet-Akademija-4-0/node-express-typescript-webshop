import Product from '../models/interfaces/productInterface'
import products from '../models/productsModel'

class ProductService {
  private products: Product[] = products

  getAllProducts(): Product[] {
    return this.products
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id)
  }

  deleteProductById(id: number): Product | undefined {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === id,
    )

    if (indexToDelete < 0) return undefined

    const deletedProduct = this.products.splice(indexToDelete, 1)
    return deletedProduct[0]
  }
}

export default new ProductService()
