
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../CSS/nav.css';
import logo from "../Photos/logo.png";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="nav-bg">
      <Container>
        <Navbar.Brand href="#home">
        <img src={logo} className="bg-white rounded p-1" alt="central gov logo" width="300" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about-us">About Us</Nav.Link>
            <Nav.Link href="/our-service">Our Services</Nav.Link>
            <Nav.Link href="/contact">Contact US</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
          <Button className="btn btn-warning mb-2 mt-2 text-dark" href="/login">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
