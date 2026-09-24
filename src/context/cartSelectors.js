export function getItemSubtotal(item) {
  return Math.round(item.price * 100) * item.quantity / 100
}

export function getCartTotals(cart) {
  return {
    totalQuantity: cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cart.reduce(
      (total, item) => total + Math.round(item.price * 100) * item.quantity,
      0,
    ) / 100,
  }
}

export function getQuantityState(cart, product, quantity) {
  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const availableQuantity = Math.max(0, product.stock - quantityInCart)
  const selectedQuantity = Math.min(quantity, availableQuantity)

  return {
    availableQuantity,
    selectedQuantity,
    canDecrease: selectedQuantity > 1,
    canIncrease: selectedQuantity < availableQuantity,
    canAdd: Number.isInteger(selectedQuantity)
      && selectedQuantity > 0
      && selectedQuantity + quantityInCart <= product.stock,
  }
}
