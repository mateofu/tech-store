import { useParams } from 'react-router-dom'
import { useProduct } from '../../hooks/useProduct.js'
import ProductDetailView from '../../views/ProductDetailView.jsx'
import ItemQuantitySelectorContainer from '../ItemQuantitySelector/ItemQuantitySelectorContainer.jsx'

function ItemDetailContainer() {
  const { id } = useParams()
  const detail = useProduct(id)

  return (
    <ProductDetailView {...detail}>
      {detail.product && (
        <ItemQuantitySelectorContainer key={detail.product.id} product={detail.product} />
      )}
    </ProductDetailView>
  )
}

export default ItemDetailContainer
