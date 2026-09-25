import { Button, Modal } from 'react-bootstrap'

function ConfirmationModal({ confirmation, onCancel, onConfirm }) {
  return (
    <Modal
      show={Boolean(confirmation)}
      onHide={onCancel}
      centered
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-description"
    >
      <Modal.Header closeButton closeLabel="Cancelar">
        <Modal.Title id="confirmation-title">{confirmation?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p id="confirmation-description" className="mb-0">{confirmation?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel} autoFocus>
          Cancelar
        </Button>
        <Button variant={confirmation?.variant} onClick={onConfirm}>
          {confirmation?.confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
