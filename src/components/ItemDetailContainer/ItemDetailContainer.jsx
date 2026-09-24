import { useEffect, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../services/productsApi.js'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'

function ItemDetailContainer() {
  const { id } = useParams()
  const [retryCount, setRetryCount] = useState(0)
  const [result, setResult] = useState({
    id: null,
    product: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setResult({ id, product: null, loading: true, error: null })

      try {
        const product = await getProductById(id, { signal: controller.signal })

        if (!controller.signal.aborted) {
          setResult({ id, product, loading: false, error: null })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({ id, product: null, loading: false, error: error.message })
        }
      }
    }

    loadProduct()

    return () => controller.abort()
  }, [id, retryCount])

  return (
    <>
      <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
        Volver al catálogo
      </Button>

      {result.id !== id || result.loading ? (
        <div role="status" className="d-flex align-items-center gap-2 py-4">
          <Spinner animation="border" size="sm" aria-hidden="true" />
          <span>Cargando producto...</span>
        </div>
      ) : result.error ? (
        <Alert variant="danger">
          <Alert.Heading as="h1" className="h4">
            No se pudo mostrar el producto
          </Alert.Heading>
          <p>{result.error}</p>
          <Button variant="outline-danger" onClick={() => setRetryCount((count) => count + 1)}>
            Reintentar
          </Button>
        </Alert>
      ) : (
        <ItemDetail key={result.product.id} product={result.product} />
      )}
    </>
  )
}

export default ItemDetailContainer
