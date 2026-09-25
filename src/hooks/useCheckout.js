import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { createCartSummary } from '../utils/cartPresentation.js'

export function useCheckout() {
  const { cart, removeItem, clearCart } = useCart()
  const [receipt, setReceipt] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  function requestRemove(id) {
    const item = cart.find((item) => item.id === id)
    if (!item || receipt) return
    setConfirmation({
      action: 'remove',
      itemId: id,
      title: 'Eliminar producto',
      description: `¿Quieres eliminar ${item.title} del carrito?`,
      confirmLabel: 'Eliminar',
      variant: 'danger',
    })
  }

  function requestClear() {
    if (cart.length === 0 || receipt) return
    setConfirmation({
      action: 'clear',
      title: 'Vaciar carrito',
      description: 'Se eliminarán todos los productos de tu carrito. ¿Quieres continuar?',
      confirmLabel: 'Vaciar carrito',
      variant: 'danger',
    })
  }

  function requestCheckout() {
    if (cart.length === 0 || receipt) return
    const summary = createCartSummary(cart)
    setConfirmation({
      action: 'checkout',
      title: 'Confirmar compra',
      description: `Vas a finalizar una compra por ${summary.formattedTotal}. Es una simulación: no se realizarán cobros ni envíos.`,
      confirmLabel: 'Finalizar compra',
      variant: 'primary',
    })
  }

  function cancelConfirmation() {
    setConfirmation(null)
  }

  function confirmAction() {
    if (!confirmation || receipt) return
    setConfirmation(null)
    if (confirmation.action === 'remove') {
      removeItem(confirmation.itemId)
    } else if (confirmation.action === 'clear') {
      clearCart()
    } else if (confirmation.action === 'checkout' && cart.length > 0) {
      setReceipt(createCartSummary(cart))
      clearCart()
    }
  }

  const summary = receipt ?? createCartSummary(cart)
  const status = receipt ? 'completed' : cart.length === 0 ? 'empty' : 'ready'

  return {
    ...summary,
    status,
    confirmation,
    requestRemove,
    requestClear,
    requestCheckout,
    cancelConfirmation,
    confirmAction,
  }
}
