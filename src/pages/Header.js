import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home">Digital Election Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/upload-voter">Upload Voter</Nav.Link>
                        <NavDropdown title="Export data" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/calling-json-to-excel">Export calling data</NavDropdown.Item>
                            <NavDropdown.Item href="/json-to-excel">
                                Export report
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/download-documents">Export JSON</Nav.Link>
                        <Nav.Link eventKey={2} href="/count-emp-survey">
                            Daily count
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
