import { signOut } from 'firebase/auth';
import './Header.css'
import React from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
// import logo from '../../../images/logo.png';

const Header = () => {
  const [user] = useAuthState(auth);

  const handelLogout = () => {
    signOut(auth);
  }
    return (
        <div>
            <Navbar sticky='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
               <Navbar.Brand as = {Link} to ="/">
                    <h4 className='text-secondary font-'>Basic PhotoGraphy</h4>
               </Navbar.Brand>
             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
             <Navbar.Collapse id="responsive-navbar-nav">
             <Nav className="me-auto">
               <Nav.Link as = {Link} to ="/home">Home</Nav.Link>
               <Nav.Link as = {Link} to ="/checkout">Check Out</Nav.Link>
               <Nav.Link as = {Link} to ="/blog">Blog</Nav.Link>
             </Nav>
             <Nav>
                {
                  user? <p className='pointer text-secondary m-2' onClick={handelLogout}>Logout</p> : <Nav.Link as = {Link} to ="/login">Login</Nav.Link>
                }
                <Nav.Link as = {Link} to ="/about">About</Nav.Link>
             </Nav>
           </Navbar.Collapse>
       </Container>
      </Navbar>
        </div>
    );
};

export default Header;