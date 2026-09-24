import { Col, Image, Row } from 'react-bootstrap'

function ItemDetail({ product, children }) {
  return (
    <article aria-labelledby="product-title">
      <Row className="g-4 align-items-start">
        <Col md={6}>
          <Image
            src={product.detailImage}
            alt={product.title}
            fluid
            rounded
            className="product-detail-image"
          />
        </Col>
        <Col md={6}>
          <h1 id="product-title">{product.title}</h1>
          <p className="fs-3 fw-semibold mb-1">{product.formattedPrice}</p>
          <p className="text-secondary mb-4">Precio expresado en USD.</p>
          <h2 className="h5">Descripción</h2>
          <p>{product.description}</p>
          {children}
        </Col>
      </Row>
    </article>
  )
}

export default ItemDetail
