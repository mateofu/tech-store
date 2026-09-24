import { Link } from 'react-router-dom'

function Checkout() {
  return (
    <>
      <h1>Resumen de compra</h1>
      <p>Aquí podrás revisar los productos de tu carrito.</p>
      <Link to="/">Volver al catálogo</Link>
    </>
  )
}

export default Checkout
