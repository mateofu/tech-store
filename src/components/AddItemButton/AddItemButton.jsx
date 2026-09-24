import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext.jsx'

function AddItemButton({ product, quantity, onAdded }) {
  const { cart, addItem } = useCart()
  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const canAdd = Number.isInteger(quantity)
    && quantity > 0
    && quantity + quantityInCart <= product.stock

  function handleClick() {
    if (!canAdd) return

    addItem(product, quantity)
    onAdded?.()
  }

  return (
    <Button onClick={handleClick} disabled={!canAdd}>
      <FontAwesomeIcon icon={faCartPlus} className="me-2" aria-hidden="true" />
      Agregar al carrito
    </Button>
  )
}

export default AddItemButton
