import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <span className="text-white fw-bold fs-4 me-2">WATCH</span>
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
              О нас
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className="text-white mx-2 px-3 py-2 rounded hover-effect"
            >
              Связаться с нами
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
