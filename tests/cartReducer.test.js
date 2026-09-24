import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cartReducer } from '../src/context/cartReducer.js'

const product = Object.freeze({
  id: 121, title: 'Phone', price: 199.99, stock: 4, thumbnail: 'phone.png',
})

test('agrega un producto sin modificar el estado anterior', () => {
  const initial = Object.freeze([])
  const cart = cartReducer(initial, { type: 'add', product, quantity: 2 })
  assert.equal(cart[0].quantity, 2)
  assert.equal(initial.length, 0)
})

test('acumula unidades sin duplicar filas ni mutar el producto previo', () => {
  const initial = Object.freeze([Object.freeze({ ...product, quantity: 2 })])
  const cart = cartReducer(initial, { type: 'add', product, quantity: 1 })
  assert.equal(cart.length, 1)
  assert.equal(cart[0].quantity, 3)
  assert.equal(initial[0].quantity, 2)
})

test('permite el stock exacto y rechaza superarlo', () => {
  const cart = cartReducer([], { type: 'add', product, quantity: 4 })
  assert.equal(cart[0].quantity, 4)
  assert.equal(cartReducer(cart, { type: 'add', product, quantity: 1 }), cart)
})

test('rechaza cantidades inválidas y productos sin stock', () => {
  const initial = []
  for (const quantity of [0, -1, 1.5, NaN, Infinity, '2']) {
    assert.equal(cartReducer(initial, { type: 'add', product, quantity }), initial)
  }
  assert.equal(cartReducer(initial, {
    type: 'add', product: { ...product, stock: 0 }, quantity: 1,
  }), initial)
})

test('rechaza precios e identificadores inválidos', () => {
  const initial = []
  for (const invalid of [null, { ...product, price: -1 },
    { ...product, price: NaN }, { ...product, id: 0 }]) {
    assert.equal(cartReducer(initial, {
      type: 'add', product: invalid, quantity: 1,
    }), initial)
  }
})

test('elimina únicamente el producto seleccionado', () => {
  const initial = [{ ...product, quantity: 2 }, { ...product, id: 122, quantity: 1 }]
  assert.deepEqual(cartReducer(initial, { type: 'remove', id: 121 }), [initial[1]])
  assert.equal(initial.length, 2)
})

test('vacía el carrito sin cambiar el resumen previamente capturado', () => {
  const cart = [{ ...product, quantity: 2 }]
  const receipt = cart.map((item) => ({ ...item }))
  assert.deepEqual(cartReducer(cart, { type: 'clear' }), [])
  assert.equal(receipt[0].quantity, 2)
  assert.equal(cart.length, 1)
})
