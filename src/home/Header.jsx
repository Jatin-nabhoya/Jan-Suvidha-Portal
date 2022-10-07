import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../CSS/nav.css';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nt">
            <Nav.Link href="/" className="navlink hover-zoom nt">Home</Nav.Link>
            <Nav.Link href="/about-us" className="navlink hover-zoom nt">About Us</Nav.Link>
            <Nav.Link href="/our-service" className="navlink hover-zoom nt">Our Services</Nav.Link>
            <Nav.Link href="/contact" className="navlink hover-zoom nt">Contact Us</Nav.Link>
            <Nav.Link href="/register" className="navlink hover-zoom nt">Register</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/login" className="text-dark text-gradient btn-warning nt px-4 text-decoration-none">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;