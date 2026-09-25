import { Col, Image, Row } from 'react-bootstrap'

function ItemDetail({ product, children }) {
  return (
    <article className="product-detail" aria-labelledby="product-title">
      <Row className="gx-4 gx-xl-5 gy-0 row-gap-4 align-items-start">
        <Col lg={6}>
          <div className="product-detail-media">
            <Image
              src={product.detailImage}
              alt={product.title}
              fluid
              className="product-detail-image"
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="product-detail-panel">
            <p className="product-detail-eyebrow">Tech Store · Detalle del producto</p>
            <h1 id="product-title">{product.title}</h1>
            <div className="product-detail-pricing">
              <p className="product-detail-price">{product.formattedPrice}</p>
              <p className="text-secondary mb-0">Precio expresado en USD.</p>
            </div>
            <section className="product-detail-description" aria-labelledby="description-title">
              <h2 id="description-title" className="h5">Descripción</h2>
              <p>{product.description}</p>
            </section>
            {children}
          </div>
        </Col>
      </Row>
    </article>
  )
}

export default ItemDetail
