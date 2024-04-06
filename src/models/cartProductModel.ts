import ICartProduct from './interfaces/cartProductInterface'
import IProduct from './interfaces/productInterface'

// da ne bi morali vise puta dodavati produkte u kosaricu imamo
// CartProduct klasu koja u sebi ima kolicinu (quantity)
// te id koji ce nam trebat kad budemo radili bazu
class CartProduct implements ICartProduct {
  constructor(id: number, product: IProduct, quantity: number) {
    this.id = id
    this.product = product
    this.quantity = quantity
  }

  id: number

  product: IProduct

  quantity: number
}

export default CartProduct
