import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { getQuantityState } from '../context/cartSelectors.js'

export function useQuantitySelector(product) {
  const { cart, addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const { availableQuantity, selectedQuantity, canDecrease, canIncrease, canAdd } =
    getQuantityState(cart, product, quantity)

  const availabilityMessage = product.stock === 0
    ? 'Producto sin stock.'
    : availableQuantity === 0
      ? 'Ya tienes todas las unidades disponibles en el carrito.'
      : `Disponibles para agregar: ${availableQuantity}`

  function decrease() {
    if (!canDecrease) return
    setQuantity(selectedQuantity - 1)
    setMessage('')
  }

  function increase() {
    if (!canIncrease) return
    setQuantity(selectedQuantity + 1)
    setMessage('')
  }

  function add() {
    if (!canAdd) return
    addItem(product, selectedQuantity)
    setMessage(`Agregaste ${selectedQuantity} ${selectedQuantity === 1 ? 'unidad' : 'unidades'} al carrito.`)
    setQuantity(1)
  }

  return {
    selectedQuantity,
    availabilityMessage,
    message,
    decreaseDisabled: !canDecrease,
    increaseDisabled: !canIncrease,
    addDisabled: !canAdd,
    decrease,
    increase,
    add,
  }
}
