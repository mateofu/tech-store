const API_URL = 'https://dummyjson.com'
const TECHNOLOGY_CATEGORIES = ['smartphones', 'laptops', 'mobile-accessories']

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

  return response.json()
}

export async function getProducts({ signal } = {}) {
  const results = await Promise.all(
    TECHNOLOGY_CATEGORIES.map((category) =>
      fetchJson(`/products/category/${category}?limit=0`, { signal }),
    ),
  )

  return results.flatMap((result) => result.products)
}

export async function getProductById(id, { signal } = {}) {
  if (!/^[1-9]\d*$/.test(String(id))) {
    throw new Error('El identificador del producto no es válido.')
  }

  return fetchJson(`/products/${id}`, { signal })
}
