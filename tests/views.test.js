import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { createProductView } from '../src/utils/productPresentation.js'
import { createCartSummary } from '../src/utils/cartPresentation.js'

let server
const views = {}
const product = createProductView({
  id: 121, title: 'Phone', price: 199.99, stock: 4,
  thumbnail: '/phone.png', images: ['/detail.png'], description: 'Smartphone',
})
const summary = createCartSummary([{ ...product, quantity: 2 }])
const noop = () => {}

before(async () => {
  server = await createServer({
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: 'custom',
    logLevel: 'error',
  })
  const paths = {
    CatalogView: '/src/views/CatalogView.jsx',
    ProductDetailView: '/src/views/ProductDetailView.jsx',
    CheckoutView: '/src/views/CheckoutView.jsx',
    CartWidget: '/src/components/CartWidget/CartWidget.jsx',
    ItemQuantitySelector: '/src/components/ItemQuantitySelector/ItemQuantitySelector.jsx',
    AddItemButton: '/src/components/AddItemButton/AddItemButton.jsx',
  }
  for (const [name, path] of Object.entries(paths)) {
    views[name] = (await server.ssrLoadModule(path)).default
  }
})

after(async () => {
  await server?.close()
})

function render(name, props, children) {
  return renderToStaticMarkup(createElement(
    MemoryRouter,
    null,
    createElement(views[name], props, children),
  ))
}

test('el catálogo muestra carga, error, vacío y productos mediante props', () => {
  const props = { greeting: 'Tecnología', products: [], loading: false, error: null, onRetry: noop }
  assert.match(render('CatalogView', { ...props, loading: true }), /Cargando productos/)
  assert.match(render('CatalogView', { ...props, error: 'Error de conexión' }), /Error de conexión/)
  assert.match(render('CatalogView', props), /No hay productos disponibles/)
  const html = render('CatalogView', { ...props, products: [product] })
  assert.match(html, /href="\/product\/121"/)
  assert.ok(html.includes(product.formattedPrice))
  assert.match(html, /Phone/)
})

test('el detalle conserva imagen, precio, descripción y controles proporcionados', () => {
  const html = render('ProductDetailView', {
    product, loading: false, error: null, onRetry: noop,
  }, createElement('button', null, 'Seleccionar cantidad'))
  assert.match(html, /src="\/detail.png"/)
  assert.ok(html.includes(product.formattedPrice))
  assert.match(html, /Smartphone/)
  assert.match(html, /Seleccionar cantidad/)
})

test('el detalle muestra carga y error sin necesitar un producto', () => {
  assert.match(render('ProductDetailView', { loading: true }), /Cargando producto/)
  const html = render('ProductDetailView', { error: 'Producto no encontrado.', onRetry: noop })
  assert.match(html, /Producto no encontrado/)
  assert.match(html, /Reintentar/)
})

test('el carrito vacío no permite finalizar una compra', () => {
  const html = render('CheckoutView', { status: 'empty' })
  assert.match(html, /Tu carrito está vacío/)
  assert.doesNotMatch(html, /Finalizar compra/)
})

test('el checkout presenta filas, importes y acciones recibidas', () => {
  const html = render('CheckoutView', {
    ...summary, status: 'ready', onRemove: noop, onClear: noop, onCheckout: noop,
  })
  assert.match(html, /Phone/)
  assert.ok(html.includes(summary.formattedTotal))
  assert.ok(html.includes(summary.items[0].formattedSubtotal))
  assert.match(html, /Eliminar Phone/)
  assert.match(html, /Finalizar compra/)
})

test('la confirmación conserva el resumen sin acciones para editar o volver a pagar', () => {
  const html = render('CheckoutView', { ...summary, status: 'completed' })
  assert.match(html, /Compra simulada finalizada/)
  assert.match(html, /Phone/)
  assert.ok(html.includes(summary.formattedTotal))
  assert.doesNotMatch(html, /Finalizar compra|Eliminar Phone|Vaciar carrito/)
})

test('el contador del carrito se presenta desde props sin un proveedor de contexto', () => {
  const html = render('CartWidget', { totalQuantity: 5 })
  assert.match(html, /Carrito: 5 productos/)
  assert.match(html, /href="\/cart"/)
})

test('el selector refleja el stock agotado y desactiva los tres botones', () => {
  const html = render('ItemQuantitySelector', {
    quantity: 0, availabilityMessage: 'Producto sin stock.', message: '',
    decreaseDisabled: true, increaseDisabled: true, addDisabled: true,
    onDecrease: noop, onIncrease: noop, onAdd: noop,
  })
  assert.match(html, /Producto sin stock/)
  assert.equal((html.match(/disabled=""/g) ?? []).length, 3)
})

test('el botón de agregar conserva la acción proporcionada sin consultar el contexto', () => {
  let calls = 0
  const onAdd = () => { calls++ }
  const element = views.AddItemButton({ onAdd, disabled: false })
  assert.equal(element.props.onClick, onAdd)
  assert.equal(element.props.disabled, false)
  element.props.onClick()
  assert.equal(calls, 1)
})
