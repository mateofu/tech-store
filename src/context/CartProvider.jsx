import { useReducer } from 'react'
import { CartContext } from './CartContext.jsx'
import { cartReducer } from './cartReducer.js'
import { getCartTotals } from './cartSelectors.js'

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

  const { totalQuantity, totalPrice } = getCartTotals(cart)

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
