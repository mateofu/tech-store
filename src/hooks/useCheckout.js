import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { createCartSummary } from '../utils/cartPresentation.js'

export function useCheckout() {
  const { cart, removeItem, clearCart } = useCart()
  const [receipt, setReceipt] = useState(null)

  function checkout() {
    if (cart.length === 0 || receipt) return
    setReceipt(createCartSummary(cart))
    clearCart()
  }

  const summary = receipt ?? createCartSummary(cart)
  const status = receipt ? 'completed' : cart.length === 0 ? 'empty' : 'ready'

  return {
    ...summary,
    status,
    onRemove: removeItem,
    onClear: clearCart,
    onCheckout: checkout,
  }
}
