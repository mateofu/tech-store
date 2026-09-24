import { Alert, Button, Spinner } from 'react-bootstrap'
import ItemList from '../components/ItemList/ItemList.jsx'

function CatalogView({ greeting, products, loading, error, onRetry }) {
  return (
    <section aria-labelledby="catalog-title">
      <header className="catalog-header">
        <h1 id="catalog-title">Catálogo de tecnología</h1>
        <p className="lead">{greeting}</p>
        <p className="text-secondary mb-0">Precios expresados en USD.</p>
      </header>
      {loading ? (
        <div role="status" className="d-flex align-items-center gap-2 py-4">
          <Spinner animation="border" size="sm" aria-hidden="true" />
          <span>Cargando productos...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">
          <p>{error}</p>
          <Button variant="outline-danger" onClick={onRetry}>Reintentar</Button>
        </Alert>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  )
}

export default CatalogView
