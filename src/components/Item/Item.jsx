import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Item({ product }) {
  return (
    <Card as="article" className="product-card h-100">
      <Card.Img
        variant="top"
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="product-card-image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h5">{product.title}</Card.Title>
        <Card.Text className="catalog-product-price">
          {product.formattedPrice}
        </Card.Text>
        <Button
          as={Link}
          to={`/product/${product.id}`}
          variant="outline-primary"
          className="mt-auto catalog-detail-button"
          aria-label={`Ver detalle de ${product.title}`}
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Item
