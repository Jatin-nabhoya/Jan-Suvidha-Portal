import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../CSS/nav.css';
import logo from "../Photos/logo.png";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
      <Navbar.Brand href="#home">
        <img src={logo} className="bg-white rounded p-1" alt="central gov logo" width="300" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className=""/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/userdashboard" className="navlink hover-zoom nt">Home</Nav.Link>
            <Nav.Link href="/availablescheme" className="navlink hover-zoom nt">Available Scheme</Nav.Link>
             {/* <Nav.Link href="/userinputform" className="navlink hover-zoom nt">User Input Form</Nav.Link> */}
             <Nav.Link href="/appliedscheme" className="navlink hover-zoom nt">Applied Scheme</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/login" className="text-dark text-gradient btn-warning nt px-4 text-decoration-none">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;




// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function CollapsibleExample() {
//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#features">Features</Nav.Link>
//             <Nav.Link href="#pricing">Pricing</Nav.Link>
//             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav>
//             <Nav.Link href="#deets">More deets</Nav.Link>
//             <Nav.Link eventKey={2} href="#memes">
//               Dank memes
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default CollapsibleExample;

// <Nav.Link href="/adminhome" className="navlink hover-zoom nt">Home</Nav.Link>
//             <Nav.Link href="/schemedetails" className="navlink hover-zoom nt">Scheme Details</Nav.Link>
//             {/* <Nav.Link href="/userinputform" className="navlink hover-zoom nt">User Input Form</Nav.Link> */}
//             <Nav.Link href="#contact" className="navlink hover-zoom nt">Contact Us</Nav.Link>