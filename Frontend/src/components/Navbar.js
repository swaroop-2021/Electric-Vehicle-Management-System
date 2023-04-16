import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

function NavigationBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>ABAC System</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/home"> 
                            <Nav.Link>Home</Nav.Link> 
                        </LinkContainer>
                        {console.log((localStorage.getItem("token"))[0])}
                        {
                        localStorage.getItem("token") ? 
                            <>
                                { (localStorage.getItem("token")).role==="admin" ? 
                                
                                <>
                                    <LinkContainer to="/addEV"> 
                                        <Nav.Link>Add EV</Nav.Link> 
                                    </LinkContainer>

                                    <LinkContainer to="/addCS"> 
                                        <Nav.Link>Add CS</Nav.Link> 
                                    </LinkContainer>

                                    <LinkContainer to="/addPolicy"> 
                                        <Nav.Link>Add Policy</Nav.Link> 
                                    </LinkContainer>
                                </>
                                :
                                <>
                                    <LinkContainer to="/chargeEV"> 
                                        <Nav.Link>Charge EV</Nav.Link> 
                                    </LinkContainer>
                                </>
                                
                                }
                                <LinkContainer to="/logout">
                                    <Nav.Link>Logut</Nav.Link>
                                </LinkContainer>
                                
                            </>
                            
                            :
                            
                            <>
                                <LinkContainer to="/login"> 
                                    <Nav.Link>Login</Nav.Link> 
                                </LinkContainer>
                                <LinkContainer to="/signup"> 
                                    <Nav.Link>SignUp</Nav.Link> 
                                </LinkContainer>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        );
  }
  
export default NavigationBar;
  