import { Alert, Col, Row } from 'react-bootstrap'
import Item from '../Item/Item.jsx'

function ItemList({ products }) {
  if (products.length === 0) {
    return <Alert variant="info">No hay productos disponibles por el momento.</Alert>
  }

  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <Item product={product} />
        </Col>
      ))}
    </Row>
  )
}

export default ItemList
