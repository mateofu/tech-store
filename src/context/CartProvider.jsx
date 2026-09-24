import { useReducer } from 'react'
import { CartContext } from './CartContext.jsx'
import { cartReducer } from './cartReducer.js'

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  function addItem(product, quantity) {
    dispatch({ type: 'add', product, quantity })
  }

  function removeItem(id) {
    dispatch({ type: 'remove', id })
  }

  function clearCart() {
    dispatch({ type: 'clear' })
  }

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  ) / 100

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      totalQuantity,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
