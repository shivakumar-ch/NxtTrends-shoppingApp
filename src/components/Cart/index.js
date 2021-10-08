import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveAll = () => {
        removeAllCartItems()
      }

      const getTotalPrice = () => {
        const sumList = cartList.map(item => item.quantity * item.price)
        const sum = sumList.reduce((a, b) => a + b, 0)

        return sum
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button className="remove-all-btn" onClick={onRemoveAll}>
                  Remove all
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="summary-div">
                  <h3>Order Total: Rs{getTotalPrice()}/-</h3>
                  <p>{cartList.length} Items in cart</p>
                  <button className="checkout-btn">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
