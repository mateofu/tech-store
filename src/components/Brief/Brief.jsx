import { Button, Image, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Brief({ items, onRemove }) {
  return (
    <Table responsive striped className="cart-table align-middle">
      <caption className="visually-hidden">Productos y valores de la compra</caption>
      <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col" className="text-center">Cantidad</th>
          <th scope="col" className="text-end">Precio unitario</th>
          <th scope="col" className="text-end">Subtotal</th>
          {onRemove && <th scope="col" className="text-end">Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <th scope="row">
              <div className="cart-product d-flex align-items-center gap-3">
                <Image
                  src={item.thumbnail}
                  alt=""
                  width={64}
                  height={64}
                  rounded
                  className="cart-product-image"
                />
                <span>{item.title}</span>
              </div>
            </th>
            <td className="text-center">{item.quantity}</td>
            <td className="text-end text-nowrap">{item.formattedPrice}</td>
            <td className="text-end text-nowrap">
              {item.formattedSubtotal}
            </td>
            {onRemove && (
              <td className="text-end">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="text-nowrap"
                  aria-label={`Eliminar ${item.title}`}
                  onClick={() => onRemove(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" aria-hidden="true" />
                  Eliminar
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Brief
