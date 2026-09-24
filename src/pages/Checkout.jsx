import { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Brief from '../components/Brief/Brief.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/formatPrice.js'

function Checkout() {
  const { cart, totalQuantity, totalPrice, removeItem, clearCart } = useCart()
  const [receipt, setReceipt] = useState(null)

  function handleCheckout() {
    if (cart.length === 0 || receipt) return

    setReceipt({
      items: cart.map((item) => ({ ...item })),
      totalQuantity,
      totalPrice,
    })
    clearCart()
  }

  if (receipt) {
    return (
      <section aria-labelledby="checkout-title">
        <h1 id="checkout-title">Compra simulada finalizada</h1>
        <Alert variant="success" className="my-4">
          <FontAwesomeIcon icon={faCheck} className="me-2" aria-hidden="true" />
          La simulación terminó correctamente. No se realizó ningún cobro ni envío.
        </Alert>
        <Brief items={receipt.items} />
        <p>Unidades: {receipt.totalQuantity}</p>
        <p className="fs-3 fw-semibold">Total: {formatPrice(receipt.totalPrice)}</p>
        <p className="text-secondary">Valores expresados en USD.</p>
        <Button as={Link} to="/">Volver al catálogo</Button>
      </section>
    )
  }

  if (cart.length === 0) {
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
      <Brief items={cart} onRemove={removeItem} />
      <Card className="checkout-summary mt-4">
        <Card.Body>
          <p>Unidades: {totalQuantity}</p>
          <p className="fs-3 fw-semibold">Total: {formatPrice(totalPrice)}</p>
          <p className="text-secondary">
            Valores expresados en USD. Esta compra es una simulación sin pagos ni envíos reales.
          </p>
          <div className="checkout-actions d-flex flex-wrap gap-2">
            <Button onClick={handleCheckout}>Finalizar compra</Button>
            <Button variant="outline-danger" onClick={clearCart}>Vaciar carrito</Button>
            <Button as={Link} to="/" variant="outline-secondary">Seguir comprando</Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  )
}

export default Checkout
