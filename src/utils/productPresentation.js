import { formatPrice } from './formatPrice.js'

export function createProductView(product) {
  return {
    ...product,
    formattedPrice: formatPrice(product.price),
    detailImage: product.images?.[0] || product.thumbnail,
  }
}
