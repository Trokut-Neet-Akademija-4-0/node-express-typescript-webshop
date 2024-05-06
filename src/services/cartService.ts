/* eslint-disable class-methods-use-this */
import productService from './productService'
import HttpError from '../utils/HttpError'
import Kosarica from '../entities/Kosarica'
import ProizvodKupac from '../entities/ProizvodKupac'
import Proizvod from '../entities/Proizvod'
import CartProductAddRequest from '../models/request/cartProductAddRequest'

// Cart servis gdje nam se nalazi cila nasa poslovna logika vezana za kosaricu
class CartService {
  async getCart(): Promise<Kosarica> {
    let nonProcessedCart = await Kosarica.findOne({
      relations: ['kupac', 'proizvodKupacs', 'proizvodKupacs.proizvod'],
      where: {
        isProcessed: false,
      },
    })

    if (!nonProcessedCart) {
      nonProcessedCart = new Kosarica()
      nonProcessedCart = await nonProcessedCart.save()
    }
    return nonProcessedCart
  }

  async getCartById(cartId: number): Promise<Kosarica> {
    const foundCart = await Kosarica.findOne({
      relations: ['kupac', 'proizvodKupacs', 'proizvodKupacs.proizvod'],
      where: {
        kosaricaId: cartId,
      },
    })

    if (!foundCart) throw new HttpError(404, `Cart with id ${cartId} not found`)
    return foundCart
  }

  // dodavanje produkta u kosaricu pomocu produkt id-a, uvijek uveca produkt za 1
  async addProductById(
    cartId: number,
    productId: number,
    cartProductAddRequest: CartProductAddRequest,
  ): Promise<Kosarica> {
    const cart = await this.getCartById(cartId)
    const product = await productService.getProductById(productId)

    this.checkIsQuantityValid(product, cartProductAddRequest.quantity)

    const existingProductInCart = cart.proizvodKupacs.find(
      (pk) => pk.proizvod.proizvodId === productId,
    )

    if (existingProductInCart) {
      existingProductInCart.kolicina += cartProductAddRequest.quantity
      await existingProductInCart.save()
    } else {
      const cartProduct = ProizvodKupac.CreateCartProduct(
        cart,
        product,
        cartProductAddRequest.quantity,
      )
      await cartProduct.save()
    }

    return this.getCartById(cartId)
  }

  async updateProductQuantity(
    cartId: number,
    productId: number,
    cartProductAddRequest: CartProductAddRequest,
  ): Promise<Kosarica> {
    const cart = await this.getCartById(cartId)
    const product = await productService.getProductById(productId)

    this.checkIsQuantityValid(product, cartProductAddRequest.quantity)

    const existingProductInCart = cart.proizvodKupacs.find(
      (pk) => pk.proizvod.proizvodId === productId,
    )

    if (existingProductInCart) {
      existingProductInCart.kolicina = cartProductAddRequest.quantity
      await existingProductInCart.save()
    }
    return cart
  }

  async removeProductFromCart(
    cartId: number,
    productId: number,
  ): Promise<Kosarica> {
    const cart = await this.getCartById(cartId)

    const existingProductInCart = cart.proizvodKupacs.find(
      (pk) => pk.proizvod.proizvodId === productId,
    )

    if (existingProductInCart) {
      await existingProductInCart.remove()
    }
    return this.getCartById(cartId)
  }

  checkIsQuantityValid(product: Proizvod, quantity: number): void {
    if (!product.kolicina || product.kolicina < quantity)
      throw new HttpError(
        404,
        `request quantity ${quantity} is larger then available product quantity(${product.kolicina})`,
      )
  }
}

export default new CartService()
