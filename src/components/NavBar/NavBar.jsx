import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import CartWidget from '../CartWidget/CartWidget.jsx'

function NavBar() {
  return (
    <Navbar
      expand="md"
      bg="dark"
      data-bs-theme="dark"
      collapseOnSelect
      aria-label="Navegación principal"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faLaptop} aria-hidden="true" />
          <span>Tech Store</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="main-navigation"
          aria-label="Abrir o cerrar menú de navegación"
        />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto gap-md-3">
            <Nav.Link as={NavLink} to="/" end eventKey="home">
              Catálogo
            </Nav.Link>
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
