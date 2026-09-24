import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="empty-cart">
      <p className="text-secondary">Error 404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe.</p>
      <Button as={Link} to="/">Volver al catálogo</Button>
    </section>
  )
}

export default NotFound
