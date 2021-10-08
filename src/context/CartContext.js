import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {
    console.log('context')
  },
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
