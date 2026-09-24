import { useCheckout } from '../hooks/useCheckout.js'
import CheckoutView from '../views/CheckoutView.jsx'

function Checkout() {
  const checkout = useCheckout()

  return <CheckoutView {...checkout} />
}

export default Checkout
