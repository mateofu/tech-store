import { useProducts } from '../../hooks/useProducts.js'
import CatalogView from '../../views/CatalogView.jsx'

function ItemListContainer({ greeting }) {
  const catalog = useProducts()

  return <CatalogView greeting={greeting} {...catalog} />
}

export default ItemListContainer
