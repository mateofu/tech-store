import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

function AddItemButton({ onAdd, disabled }) {
  return (
    <Button onClick={onAdd} disabled={disabled}>
      <FontAwesomeIcon icon={faCartPlus} className="me-2" aria-hidden="true" />
      Agregar al carrito
    </Button>
  )
}

export default AddItemButton
