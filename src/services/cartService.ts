import CartProduct from '../models/cartProductModel'
import ICart from '../models/interfaces/cartInterface'
import userCart from '../models/cartModel'
import productService from './productService'

// Cart servis gdje nam se nalazi cila nasa poslovna logika vezana za kosaricu
class CartService {
  private cart: ICart = userCart

  getCart(): ICart {
    return this.cart
  }

  // dodavanje produkta u kosaricu pomocu produkt id-a, uvijek uveca produkt za 1
  addProductById(id: number): ICart {
    this.changeProductQuantity(id, 1)
    return this.cart
  }

  // skidanje cijelog produkta iz kosarice
  deleteProductById(id: number): ICart {
    const indexToDelete = this.getCartProductIndexByProductId(id)

    if (indexToDelete >= 0) this.cart.products.splice(indexToDelete, 1)

    return this.cart
  }

  // metoda koja kreira produkt u kosarici ako ne postoji,
  // uvecava kolicinu ako je quantityModifier pozitivan broj
  // i smanjuje kolicinu ako je negativen, a ako je nula brise produkt iz kosarice
  changeProductQuantity(productId: number, quantityModifier: number): void {
    const product = productService.getProductById(productId)

    if (product !== undefined) {
      const existingCartProduct = this.cart.products.find(
        (cartProduct) => cartProduct.product.id === product.id,
      )
      if (existingCartProduct) {
        if (existingCartProduct.quantity + quantityModifier > 0)
          existingCartProduct.quantity += quantityModifier
        else this.deleteProductById(existingCartProduct.id)
      } else if (quantityModifier > 0)
        this.cart.products.push(
          new CartProduct(
            this.getNextAvailableCartProductId(),
            product,
            quantityModifier,
          ),
        )
    }
  }

  // pomocna metoda koja na temelju product id-a nalazi cart product
  getCartProductByProductId(id: number): CartProduct | undefined {
    return this.cart.products.find(
      (cartProduct) => cartProduct.product.id === id,
    )
  }

  // pomocna metoda koja na temelju product id-a nalazi cart product index
  getCartProductIndexByProductId(id: number): number {
    return this.cart.products.findIndex(
      (cartProduct) => cartProduct.product.id === id,
    )
  }

  // pomocna metoda koja provjerava koji je cart product id najveci
  // i vraca broj uvecan za 1 da bi nam bio dostupan id
  getNextAvailableCartProductId(): number {
    let greatestId = 0
    this.cart.products.forEach((cartProduct) => {
      greatestId = cartProduct.id > greatestId ? cartProduct.id : greatestId
    })
    return greatestId + 1
  }
}

export default new CartService()
