import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice.js'

function Item({ product }) {
  return (
    <Card as="article" className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="p-3"
        style={{ height: '220px', objectFit: 'contain' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h5">{product.title}</Card.Title>
        <Card.Text className="fs-5 fw-semibold">
          {formatPrice(product.price)}
        </Card.Text>
        <Button
          as={Link}
          to={`/product/${product.id}`}
          className="mt-auto"
          aria-label={`Ver detalle de ${product.title}`}
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Item

