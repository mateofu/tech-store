import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  return (
    <main className="welcome">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Checkout />} />
      </Routes>
    </main>
  )
}

export default App
