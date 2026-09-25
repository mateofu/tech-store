import { useCheckout } from '../hooks/useCheckout.js'
import CheckoutView from '../views/CheckoutView.jsx'
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal.jsx'

function Checkout() {
  const {
    items,
    totalQuantity,
    formattedTotal,
    status,
    confirmation,
    requestRemove,
    requestClear,
    requestCheckout,
    cancelConfirmation,
    confirmAction,
  } = useCheckout()

  return (
    <>
      <CheckoutView
        items={items}
        totalQuantity={totalQuantity}
        formattedTotal={formattedTotal}
        status={status}
        onRemove={requestRemove}
        onClear={requestClear}
        onCheckout={requestCheckout}
      />
      <ConfirmationModal
        confirmation={confirmation}
        onCancel={cancelConfirmation}
        onConfirm={confirmAction}
      />
    </>
  )
}

export default Checkout
