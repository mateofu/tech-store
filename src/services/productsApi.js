const API_URL = 'https://dummyjson.com'
const TECHNOLOGY_CATEGORIES = ['smartphones', 'laptops', 'mobile-accessories']

function isValidProduct(product) {
  return product !== null
    && typeof product === 'object'
    && Number.isSafeInteger(product.id) && product.id > 0
    && typeof product.title === 'string' && product.title.trim().length > 0
    && typeof product.description === 'string'
    && typeof product.thumbnail === 'string' && product.thumbnail.length > 0
    && Number.isFinite(product.price) && product.price >= 0
    && Number.isSafeInteger(product.stock) && product.stock >= 0
    && (product.images === undefined || (
      Array.isArray(product.images)
      && product.images.every((image) => typeof image === 'string')
    ))
}

async function fetchJson(path, { signal } = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, { signal })
  } catch (error) {
    if (signal?.aborted || error.name === 'AbortError') {
      throw error
    }

    throw new Error('No se pudo conectar con el catálogo. Intenta nuevamente.')
  }

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'Producto no encontrado.'
        : 'No se pudieron cargar los productos. Intenta nuevamente.',
    )
  }

  try {
    return await response.json()
  } catch (error) {
    if (signal?.aborted || error.name === 'AbortError') {
      throw error
    }

    throw new Error('La API devolvió una respuesta no válida. Intenta nuevamente.')
  }
}

export async function getProducts({ signal } = {}) {
  const results = await Promise.all(
    TECHNOLOGY_CATEGORIES.map((category) =>
      fetchJson(`/products/category/${category}?limit=0`, { signal }),
    ),
  )

  if (results.some((result) => !Array.isArray(result?.products)
    || !result.products.every(isValidProduct))) {
    throw new Error('La API devolvió datos de productos incompletos o no válidos.')
  }

  return results.flatMap((result) => result.products)
}

export async function getProductById(id, { signal } = {}) {
  if (!/^[1-9]\d*$/.test(String(id)) || !Number.isSafeInteger(Number(id))) {
    throw new Error('El identificador del producto no es válido.')
  }

  const product = await fetchJson(`/products/${id}`, { signal })

  if (!isValidProduct(product) || product.id !== Number(id)) {
    throw new Error('La API devolvió datos del producto incompletos o no válidos.')
  }

  return product
}
