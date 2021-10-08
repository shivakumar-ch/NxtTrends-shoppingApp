import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return {...item}
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let index = ''
    const updatedList = cartList.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return {...item, quantity: item.quantity - 1}
        }
        index = cartList.indexOf(item)
        return {...item}
      }
      return {...item}
    })
    if (typeof index === 'number') {
      updatedList.splice(index, 1)
    }

    this.setState({cartList: updatedList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(item => item.id === id)
    cartList.splice(index, 1)
    this.setState({cartList: [...cartList]})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const isNotInCart = cartList.every(item => item.id !== product.id)
    if (isNotInCart) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedList = cartList.map(item => {
        if (item.id === product.id) {
          return {...item, quantity: item.quantity + product.quantity}
        }
        return item
      })
      this.setState({cartList: [...updatedList]})
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
