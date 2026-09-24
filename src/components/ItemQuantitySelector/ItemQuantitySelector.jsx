import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddItemButton from '../AddItemButton/AddItemButton.jsx'

function ItemQuantitySelector({
  quantity,
  availabilityMessage,
  message,
  decreaseDisabled,
  increaseDisabled,
  addDisabled,
  onDecrease,
  onIncrease,
  onAdd,
}) {
  return (
    <section className="mt-4" aria-labelledby="quantity-title">
      <h2 id="quantity-title" className="h5">Cantidad</h2>
      <p className="text-secondary">{availabilityMessage}</p>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Button
          variant="outline-secondary"
          aria-label="Disminuir cantidad"
          disabled={decreaseDisabled}
          onClick={onDecrease}
        >
          <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
        </Button>
        <output aria-label="Cantidad seleccionada" className="fw-semibold">
          {quantity}
        </output>
        <Button
          variant="outline-secondary"
          aria-label="Aumentar cantidad"
          disabled={increaseDisabled}
          onClick={onIncrease}
        >
          <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
        </Button>
      </div>
      <AddItemButton onAdd={onAdd} disabled={addDisabled} />
      <p role="status" className="text-success mt-3 mb-0">{message}</p>
    </section>
  )
}

export default ItemQuantitySelector
