import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useHistory} from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import userLogo from '../assets/user.png';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header({activeLink}) {
  const {user,logout} = useAuth();
  const history = useHistory();

  function handleLogout(){
    logout();
    history.push('/login');
  }

  return (
    <Navbar expand="lg" fixed='top' className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="navLogo" />
        </Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={`${activeLink==='home' && 'active' }`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/menu" className={`${activeLink==='menu' && 'active' }`}>
              Menu
            </Nav.Link>
            <Nav.Link  as={Link} to="/about" className={`${activeLink==='about' && 'active' }`}>About</Nav.Link>
            <Nav.Link  as={Link} to="/contact" className={`${activeLink==='contact' && 'active' }`}>Contact</Nav.Link>
          
          </Nav>
          <Nav className="ms-auto">
          {user ?  
            <>
               <Nav.Link href="#"><img class="userProfileIcon" src={userLogo} alt=" "/></Nav.Link>
             <NavDropdown title={user?.username} id="basic-nav-dropdown">
             {user?.role==='chef' ? <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>: <NavDropdown.Item as={Link} to="/dashboard/profile">Profile</NavDropdown.Item>}
             <NavDropdown.Item href="#" onClick={handleLogout}>
               Logout
             </NavDropdown.Item>
           
           </NavDropdown>
            </>
            :  <>
            <Nav.Link  as={Link} to="/login">Login</Nav.Link>
            <Nav.Link  as={Link} to="/register">Register</Nav.Link>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;