import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>Tienda de tecnología</h1>
      <p>Encuentra tecnología para tu día a día.</p>
      <h2>Catálogo de productos</h2>
      <p>Próximamente podrás explorar nuestros productos.</p>
      <ul>
        <li><Link to="/product/1">Ver detalle de ejemplo</Link></li>
        <li><Link to="/cart">Ir al carrito</Link></li>
      </ul>
    </>
  )
}

export default Home
