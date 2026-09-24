import { Link, useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()

  return (
    <>
      <h1>Detalle del producto</h1>
      <p>Producto seleccionado: {id}</p>
      <p>Próximamente encontrarás aquí su información.</p>
      <Link to="/">Volver al catálogo</Link>
    </>
  )
}

export default ProductDetail
