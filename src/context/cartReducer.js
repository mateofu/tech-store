export function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const { product, quantity } = action

      if (
        !product ||
        !Number.isInteger(product.id) || product.id <= 0 ||
        !Number.isFinite(product.price) || product.price < 0 ||
        !Number.isInteger(product.stock) || product.stock < 0 ||
        !Number.isInteger(quantity) || quantity <= 0
      ) {
        return cart
      }

      const current = cart.find((item) => item.id === product.id)
      const nextQuantity = (current?.quantity ?? 0) + quantity

      if (nextQuantity > product.stock) {
        return cart
      }

      const nextItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: nextQuantity,
      }

      return current
        ? cart.map((item) => item.id === product.id ? nextItem : item)
        : [...cart, nextItem]
    }
    case 'remove':
      return cart.filter((item) => item.id !== action.id)
    case 'clear':
      return []
    default:
      return cart
  }
}
