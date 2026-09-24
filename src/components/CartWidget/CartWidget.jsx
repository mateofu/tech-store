import { Badge, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext.jsx'

function CartWidget() {
  const { totalQuantity } = useCart()

  return (
    <Nav.Link
      as={NavLink}
      to="/cart"
      eventKey="cart"
      className="d-flex align-items-center gap-2"
      aria-label={`Carrito: ${totalQuantity} productos`}
    >
      <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
      <span>Carrito</span>
      <Badge bg="primary" pill>{totalQuantity}</Badge>
    </Nav.Link>
  )
}

export default CartWidget

