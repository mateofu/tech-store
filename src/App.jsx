import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  return (
    <>
      <NavBar />
      <Container as="main" className="py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Checkout />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
