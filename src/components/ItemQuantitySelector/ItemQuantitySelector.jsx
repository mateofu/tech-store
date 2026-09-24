import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext.jsx'
import AddItemButton from '../AddItemButton/AddItemButton.jsx'

function ItemQuantitySelector({ product }) {
  const { cart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const availableQuantity = Math.max(0, product.stock - quantityInCart)
  const selectedQuantity = Math.min(quantity, availableQuantity)

  function handleAdded() {
    setMessage(`Agregaste ${selectedQuantity} ${selectedQuantity === 1 ? 'unidad' : 'unidades'} al carrito.`)
    setQuantity(1)
  }

  return (
    <section className="mt-4" aria-labelledby="quantity-title">
      <h2 id="quantity-title" className="h5">Cantidad</h2>
      <p className="text-secondary">
        {product.stock === 0
          ? 'Producto sin stock.'
          : availableQuantity === 0
            ? 'Ya tienes todas las unidades disponibles en el carrito.'
            : `Disponibles para agregar: ${availableQuantity}`}
      </p>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Button
          variant="outline-secondary"
          aria-label="Disminuir cantidad"
          disabled={selectedQuantity <= 1}
          onClick={() => {
            setQuantity(selectedQuantity - 1)
            setMessage('')
          }}
        >
          <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
        </Button>
        <output aria-label="Cantidad seleccionada" className="fw-semibold">
          {selectedQuantity}
        </output>
        <Button
          variant="outline-secondary"
          aria-label="Aumentar cantidad"
          disabled={selectedQuantity >= availableQuantity}
          onClick={() => {
            setQuantity(selectedQuantity + 1)
            setMessage('')
          }}
        >
          <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
        </Button>
      </div>
      <AddItemButton
        product={product}
        quantity={selectedQuantity}
        onAdded={handleAdded}
      />
      <p role="status" className="text-success mt-3 mb-0">{message}</p>
    </section>
  )
}

export default ItemQuantitySelector
