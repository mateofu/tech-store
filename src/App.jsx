import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import CartWidgetContainer from './components/CartWidget/CartWidgetContainer.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Checkout from './pages/Checkout.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <NavBar cartWidget={<CartWidgetContainer />} />
      <Container as="main" className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
