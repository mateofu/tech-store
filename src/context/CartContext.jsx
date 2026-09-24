import { createContext, useContext } from 'react'

export const CartContext = createContext(null)

export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart debe utilizarse dentro de CartProvider.')
  }

  return context
}
