import { useCart } from '../../context/CartContext.jsx'
import CartWidget from './CartWidget.jsx'

function CartWidgetContainer() {
  const { totalQuantity } = useCart()

  return <CartWidget totalQuantity={totalQuantity} />
}

export default CartWidgetContainer
