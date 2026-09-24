import { Col, Image, Row } from 'react-bootstrap'
import { formatPrice } from '../../utils/formatPrice.js'

function ItemDetail({ product }) {
  return (
    <article aria-labelledby="product-title">
      <Row className="g-4 align-items-start">
        <Col md={6}>
          <Image
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            fluid
            rounded
            className="w-100 bg-white p-4"
            style={{ height: '400px', objectFit: 'contain' }}
          />
        </Col>
        <Col md={6}>
          <h1 id="product-title">{product.title}</h1>
          <p className="fs-3 fw-semibold mb-1">{formatPrice(product.price)}</p>
          <p className="text-secondary mb-4">Precio expresado en USD.</p>
          <h2 className="h5">Descripción</h2>
          <p>{product.description}</p>
        </Col>
      </Row>
    </article>
  )
}

export default ItemDetail
