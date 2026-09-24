import { useEffect, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { getProducts } from '../../services/productsApi.js'
import ItemList from '../ItemList/ItemList.jsx'

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        const data = await getProducts({ signal: controller.signal })

        if (!controller.signal.aborted) {
          setProducts(data)
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [retryCount])

  return (
    <section aria-labelledby="catalog-title">
      <h1 id="catalog-title">Catálogo de tecnología</h1>
      <p className="lead">{greeting}</p>
      <p className="text-secondary mb-4">Precios expresados en USD.</p>

      {loading ? (
        <div role="status" className="d-flex align-items-center gap-2 py-4">
          <Spinner animation="border" size="sm" aria-hidden="true" />
          <span>Cargando productos...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => setRetryCount((count) => count + 1)}>
            Reintentar
          </Button>
        </Alert>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  )
}

export default ItemListContainer
