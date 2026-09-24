import { useEffect, useState } from 'react'
import { getProductById } from '../services/productsApi.js'
import { createProductView } from '../utils/productPresentation.js'

export function useProduct(id) {
  const [retryCount, setRetryCount] = useState(0)
  const [result, setResult] = useState({
    id: null,
    product: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setResult({ id, product: null, loading: true, error: null })

      try {
        const data = await getProductById(id, { signal: controller.signal })

        if (!controller.signal.aborted) {
          setResult({ id, product: createProductView(data), loading: false, error: null })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({ id, product: null, loading: false, error: error.message })
        }
      }
    }

    loadProduct()
    return () => controller.abort()
  }, [id, retryCount])

  function retry() {
    setRetryCount((count) => count + 1)
  }

  const current = result.id === id

  return {
    product: current ? result.product : null,
    loading: !current || result.loading,
    error: current ? result.error : null,
    onRetry: retry,
  }
}
