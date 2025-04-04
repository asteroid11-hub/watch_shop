import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Links } from 'react-router';
import { UserContext } from '../../routes/UserContext';

function NavBar({ isLoggedIn, logoutHandler, user }) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="text-white fw-bold fs-4 me-2">AETERNIS</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#about"
              className="text-white mx-2 px-3 py-2 rounded hover-effect"
            >
              {user ? user.name : null}
            </Nav.Link>
            <Nav.Link
              href="#about"
              className="text-white mx-2 px-3 py-2 rounded hover-effect"
            >
              О нас
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className="text-white mx-2 px-3 py-2 rounded hover-effect"
            >
              Связаться с нами
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Button as={Link} to="/admin" variant="secondary" className="me-3">
                  Управление
                </Button>
                <Button variant="secondary" onClick={logoutHandler}>
                  Выход
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
