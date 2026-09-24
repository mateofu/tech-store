import { useEffect, useState } from 'react'
import { getProducts } from '../services/productsApi.js'
import { createProductView } from '../utils/productPresentation.js'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        const data = await getProducts({ signal: controller.signal })

        if (!controller.signal.aborted) {
          setProducts(data.map(createProductView))
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [retryCount])

  function retry() {
    setRetryCount((count) => count + 1)
  }

  return { products, loading, error, onRetry: retry }
}
