import { useQuantitySelector } from '../../hooks/useQuantitySelector.js'
import ItemQuantitySelector from './ItemQuantitySelector.jsx'

function ItemQuantitySelectorContainer({ product }) {
  const {
    selectedQuantity,
    availabilityMessage,
    message,
    decreaseDisabled,
    increaseDisabled,
    addDisabled,
    decrease,
    increase,
    add,
  } = useQuantitySelector(product)

  return (
    <ItemQuantitySelector
      quantity={selectedQuantity}
      availabilityMessage={availabilityMessage}
      message={message}
      decreaseDisabled={decreaseDisabled}
      increaseDisabled={increaseDisabled}
      addDisabled={addDisabled}
      onDecrease={decrease}
      onIncrease={increase}
      onAdd={add}
    />
  )
}

export default ItemQuantitySelectorContainer
