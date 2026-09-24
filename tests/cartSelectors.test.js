import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getCartTotals, getItemSubtotal, getQuantityState } from '../src/context/cartSelectors.js'
import { cartReducer } from '../src/context/cartReducer.js'
import { createCartSummary } from '../src/utils/cartPresentation.js'
import { createProductView } from '../src/utils/productPresentation.js'
import { formatPrice } from '../src/utils/formatPrice.js'

const product = Object.freeze({
  id: 121, title: 'Phone', price: 199.99, stock: 4,
  thumbnail: 'phone.png', images: ['detail.png'], description: 'Smartphone',
})

test('el carrito vacío tiene totales en cero', () => {
  assert.deepEqual(getCartTotals([]), { totalQuantity: 0, totalPrice: 0 })
})

test('suma unidades y precios en centavos sin acumulación decimal', () => {
  const cart = [{ price: 0.1, quantity: 3 }, { price: 0.2, quantity: 1 }]
  assert.equal(getItemSubtotal(cart[0]), 0.3)
  assert.deepEqual(getCartTotals(cart), { totalQuantity: 4, totalPrice: 0.5 })
})

test('los subtotales corresponden al total de productos distintos', () => {
  const cart = [{ ...product, quantity: 2 }, { ...product, id: 122, price: 49.95, quantity: 3 }]
  assert.equal(getItemSubtotal(cart[0]), 399.98)
  assert.equal(getItemSubtotal(cart[1]), 149.85)
  assert.deepEqual(getCartTotals(cart), { totalQuantity: 5, totalPrice: 549.83 })
})

test('el selector descuenta las unidades ya agregadas al carrito', () => {
  const state = getQuantityState([{ ...product, quantity: 3 }], product, 2)
  assert.equal(state.availableQuantity, 1)
  assert.equal(state.selectedQuantity, 1)
  assert.equal(state.canIncrease, false)
  assert.equal(state.canDecrease, false)
  assert.equal(state.canAdd, true)
})

test('el selector bloquea acciones al agotar el stock', () => {
  for (const state of [
    getQuantityState([{ ...product, quantity: 4 }], product, 1),
    getQuantityState([], { ...product, stock: 0 }, 1),
  ]) {
    assert.equal(state.selectedQuantity, 0)
    assert.equal(state.canAdd, false)
    assert.equal(state.canIncrease, false)
    assert.equal(state.canDecrease, false)
  }
})

test('la selección permite disminuir y aumentar dentro de los límites', () => {
  const state = getQuantityState([], product, 2)
  assert.equal(state.canDecrease, true)
  assert.equal(state.canIncrease, true)
  assert.equal(state.canAdd, true)
})

test('el formato para la vista no modifica el producto recibido', () => {
  const view = createProductView(product)
  assert.equal(view.detailImage, 'detail.png')
  assert.equal(view.formattedPrice, formatPrice(199.99))
  assert.equal(view.price, product.price)
  assert.equal(product.formattedPrice, undefined)
  assert.equal(createProductView({ ...product, images: [] }).detailImage, 'phone.png')
})

test('el resumen conserva sus datos tras eliminar o vaciar el carrito', () => {
  const cart = [{ ...product, quantity: 2 }]
  const summary = createCartSummary(cart)
  assert.equal(summary.totalQuantity, 2)
  assert.equal(summary.formattedTotal, formatPrice(399.98))
  assert.equal(summary.items[0].formattedSubtotal, formatPrice(399.98))
  assert.notEqual(summary.items[0], cart[0])
  assert.deepEqual(cartReducer(cart, { type: 'remove', id: 121 }), [])
  assert.deepEqual(cartReducer(cart, { type: 'clear' }), [])
  assert.equal(summary.items[0].quantity, 2)
})
