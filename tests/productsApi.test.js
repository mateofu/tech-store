import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getProducts, getProductById } from '../src/services/productsApi.js'

const product = {
  id: 121, title: 'Phone', description: 'Smartphone', price: 199.99,
  stock: 4, thumbnail: 'https://example.com/phone.png',
}

test('consulta las tres categorías completas y devuelve un array plano', async (t) => {
  const paths = []
  t.mock.method(globalThis, 'fetch', async (url) => {
    paths.push(new URL(url).pathname)
    assert.equal(new URL(url).searchParams.get('limit'), '0')
    return Response.json({ products: [{ ...product, id: paths.length }] })
  })
  const products = await getProducts()
  assert.equal(products.length, 3)
  assert.deepEqual(paths, [
    '/products/category/smartphones', '/products/category/laptops',
    '/products/category/mobile-accessories',
  ])
})

test('permite un catálogo vacío válido', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ products: [] }))
  assert.deepEqual(await getProducts(), [])
})

test('rechaza una respuesta sin array de productos', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ unexpected: true }))
  await assert.rejects(getProducts(), /incompletos/)
})

test('rechaza productos incompletos antes de renderizarlos', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ products: [{ id: 1 }] }))
  await assert.rejects(getProducts(), /incompletos/)
})

test('devuelve el detalle para un ID numérico o de la URL', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    assert.equal(url, 'https://dummyjson.com/products/121')
    return Response.json(product)
  })
  assert.deepEqual(await getProductById(121), product)
  assert.deepEqual(await getProductById('121'), product)
})

test('rechaza IDs inválidos sin consultar la API', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json(product))
  for (const id of ['abc', '../121', 0, -1, 1.5, null, '9007199254740993']) {
    await assert.rejects(getProductById(id), /identificador/)
  }
  assert.equal(fetchMock.mock.callCount(), 0)
})

test('rechaza un detalle con datos de otro producto', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ ...product, id: 122 }))
  await assert.rejects(getProductById(121), /incompletos/)
})

test('rechaza un detalle incompleto', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ id: 121 }))
  await assert.rejects(getProductById(121), /incompletos/)
})

test('presenta un error específico para HTTP 404', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 404 }))
  await assert.rejects(getProductById(121), /Producto no encontrado/)
})

test('maneja HTTP 500', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 500 }))
  await assert.rejects(getProducts(), /No se pudieron cargar/)
})

test('maneja errores de conexión', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('fetch failed') })
  await assert.rejects(getProducts(), /No se pudo conectar/)
})

test('maneja una respuesta que no es JSON', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<html>Error</html>'))
  await assert.rejects(getProductById(121), /respuesta no válida/)
})

test('preserva la cancelación de solicitudes', async (t) => {
  const controller = new AbortController()
  controller.abort()
  t.mock.method(globalThis, 'fetch', async (_, { signal }) => {
    assert.equal(signal, controller.signal)
    signal.throwIfAborted()
  })
  await assert.rejects(getProducts({ signal: controller.signal }), { name: 'AbortError' })
})
