/* eslint-disable class-methods-use-this */
import Proizvod from '../entities/Proizvod'
import IProduct from '../models/interfaces/productInterface'
import products from '../models/productsModel'
import HttpError from '../utils/HttpError'

class ProductService {
  private products: IProduct[] = products

  async getAllProducts(): Promise<Proizvod[]> {
    return Proizvod.find()
  }

  getProductById(id: number): IProduct {
    const foundProduct = this.products.find((product) => product.id === id)
    if (!foundProduct)
      throw new HttpError(404, `Product with id ${id} not found`)
    return foundProduct
  }

  deleteProductById(id: number): IProduct {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === id,
    )

    if (indexToDelete < 0)
      throw new HttpError(404, `Product with id ${id} not found`)

    const deletedProduct = this.products.splice(indexToDelete, 1)
    return deletedProduct[0]
  }

  async addNewProduct(product: Proizvod): Promise<Proizvod> {
    const proizvod = new Proizvod()
    proizvod.imeProizvoda = product.imeProizvoda
    proizvod.opis = product.opis
    proizvod.proizvodjac = product.proizvodjac
    proizvod.cijena = product.cijena
    proizvod.kolicina = product.kolicina
    return proizvod.save()
  }
}

export default new ProductService()
