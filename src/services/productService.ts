/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Proizvod from '../entities/Proizvod'
import Slika from '../entities/Slika'
import IProduct from '../models/interfaces/productInterface'
import products from '../models/productsModel'
import HttpError from '../utils/HttpError'

class ProductService {
  private products: IProduct[] = products

  async getAllProducts(): Promise<Proizvod[]> {
    return Proizvod.find({
      relations: {
        slikas: true,
      },
    })
  }

  async getProductById(id: number): Promise<Proizvod> {
    const foundProduct = await Proizvod.findOne({
      relations: {
        slikas: true,
      },
      where: {
        proizvodId: id,
      },
    })
    if (!foundProduct)
      throw new HttpError(404, `Product with id ${id} not found`)
    return foundProduct
  }

  async updateProduct(
    productId: number,
    existingProduct: Proizvod,
  ): Promise<Proizvod> {
    const product = await this.getProductById(productId)
    product.updateExistingProduct(existingProduct)
    return product.save()
  }

  async deleteProductById(id: number): Promise<Proizvod> {
    const product = await this.getProductById(id)
    return product.remove()
  }

  async addNewProduct(product: Proizvod): Promise<Proizvod> {
    const proizvod = Proizvod.create(product)
    return proizvod.save()
  }

  async getProductPictures(productId: number): Promise<Slika[]> {
    const product = await this.getProductById(productId)
    return product.slikas
  }

  async addNewPicturesToExistingProduct(
    productId: number,
    newPictures: Slika[],
  ): Promise<Proizvod> {
    const product = await this.getProductById(productId)
    for await (const picture of newPictures) {
      const newPictureEntity = Slika.create(picture)
      newPictureEntity.proizvod = product
      await newPictureEntity.save()
    }
    return this.getProductById(productId)
  }

  async updateExistingPicturesInExistingProduct(
    updatePictures: Slika[],
  ): Promise<Slika[]> {
    const updatedPictures = new Array<Slika>()
    for await (const picture of updatePictures) {
      const existingPicture = await Slika.findOne({
        where: {
          slikaId: picture.slikaId,
        },
      })
      if (existingPicture) {
        existingPicture.isThumbnail = picture.isThumbnail
        existingPicture.link = picture.link
        existingPicture.naziv = picture.naziv
        existingPicture.opis = picture.opis
        existingPicture.proizvodId = picture.proizvodId
        updatedPictures.push(await existingPicture.save())
      }
    }
    return updatedPictures
  }
}

export default new ProductService()
