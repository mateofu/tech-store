import { getCartTotals, getItemSubtotal } from '../context/cartSelectors.js'
import { formatPrice } from './formatPrice.js'

export function createCartSummary(cart) {
  const { totalQuantity, totalPrice } = getCartTotals(cart)

  return {
    items: cart.map((item) => ({
      ...item,
      formattedPrice: formatPrice(item.price),
      formattedSubtotal: formatPrice(getItemSubtotal(item)),
    })),
    totalQuantity,
    formattedTotal: formatPrice(totalPrice),
  }
}
