import { Alert, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ItemDetail from '../components/ItemDetail/ItemDetail.jsx'

function ProductDetailView({ product, loading, error, onRetry, children }) {
  return (
    <>
      <Link to="/" className="detail-back-link mb-4">
        Volver al catálogo
      </Link>
      {loading ? (
        <div role="status" className="page-loading">
          <Spinner animation="border" variant="primary" aria-hidden="true" />
          <span>Cargando producto...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">
          <Alert.Heading as="h1" className="h4">
            No se pudo mostrar el producto
          </Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={onRetry}>Reintentar</Button>
        </Alert>
      ) : (
        <ItemDetail product={product}>{children}</ItemDetail>
      )}
    </>
  )
}

export default ProductDetailView
