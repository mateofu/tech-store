import { Alert, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Brief from '../components/Brief/Brief.jsx'

function CheckoutView({ status, items, totalQuantity, formattedTotal, onRemove, onClear, onCheckout }) {
  if (status === 'completed') {
    return (
      <section aria-labelledby="checkout-title">
        <h1 id="checkout-title">Compra simulada finalizada</h1>
        <Alert variant="success" className="my-4">
          <FontAwesomeIcon icon={faCheck} className="me-2" aria-hidden="true" />
          La simulación terminó correctamente. No se realizó ningún cobro ni envío.
        </Alert>
        <Brief items={items} />
        <p>Unidades: {totalQuantity}</p>
        <p className="fs-3 fw-semibold">Total: {formattedTotal}</p>
        <p className="text-secondary">Valores expresados en USD.</p>
        <Button as={Link} to="/">Volver al catálogo</Button>
      </section>
    )
  }

  if (status === 'empty') {
    return (
      <section className="empty-cart" aria-labelledby="checkout-title">
        <h1 id="checkout-title">Tu carrito está vacío</h1>
        <p className="my-4">Explora el catálogo y agrega los productos que te interesan.</p>
        <Button as={Link} to="/">
          <FontAwesomeIcon icon={faCartShopping} className="me-2" aria-hidden="true" />
          Explorar productos
        </Button>
      </section>
    )
  }

  return (
    <section aria-labelledby="checkout-title">
      <h1 id="checkout-title">Resumen de compra</h1>
      <p className="text-secondary">Revisa tus productos antes de finalizar.</p>
      <Brief items={items} onRemove={onRemove} />
      <Card className="checkout-summary mt-4">
        <Card.Body>
          <p>Unidades: {totalQuantity}</p>
          <p className="fs-3 fw-semibold">Total: {formattedTotal}</p>
          <p className="text-secondary">
            Valores expresados en USD. Esta compra es una simulación sin pagos ni envíos reales.
          </p>
          <div className="checkout-actions d-flex flex-wrap gap-2">
            <Button onClick={onCheckout}>Finalizar compra</Button>
            <Button variant="outline-danger" onClick={onClear}>Vaciar carrito</Button>
            <Button as={Link} to="/" variant="outline-secondary">Seguir comprando</Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  )
}

export default CheckoutView
