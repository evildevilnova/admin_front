import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';
import signin  from '../../containers/signin/index';

const Header = (props) => {

    const auth = useSelector(state => state.auth); 
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Logout</span>
                </li>
            </Nav>            
        )
    }

    const renderNonLggedInLinks = () => {
        return(
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signin" className="navbar-item" exact className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/signup' className="navbar-item" exact className="nav-link">signup</NavLink>
                </li>
            </Nav>            
        )
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                        </Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLggedInLinks()};
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
