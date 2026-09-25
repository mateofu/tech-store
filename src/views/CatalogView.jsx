import { Alert, Button, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faMobileScreenButton, faHeadphones } from '@fortawesome/free-solid-svg-icons'
import ItemList from '../components/ItemList/ItemList.jsx'

function CatalogView({ greeting, products, loading, error, onRetry }) {
  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <header className="catalog-header">
        <div className="catalog-intro">
          <p className="catalog-eyebrow">TECH STORE / EXPLORA Y ELIGE</p>
          <h1 id="catalog-title">Catálogo de tecnología</h1>
          <p className="lead">{greeting}</p>
          <p className="catalog-currency">Precios expresados en USD.</p>
        </div>
        <div className="catalog-illustration" aria-hidden="true">
          <div className="catalog-device catalog-device-laptop"><FontAwesomeIcon icon={faLaptop} /></div>
          <div className="catalog-device catalog-device-phone"><FontAwesomeIcon icon={faMobileScreenButton} /></div>
          <div className="catalog-device catalog-device-audio"><FontAwesomeIcon icon={faHeadphones} /></div>
        </div>
      </header>
      <div className="catalog-section-heading">
        <h2>Explora nuestros productos</h2>
        <span>Celulares, portátiles y accesorios</span>
      </div>
      {loading ? (
        <div role="status" className="page-loading">
          <Spinner animation="border" variant="primary" aria-hidden="true" />
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
