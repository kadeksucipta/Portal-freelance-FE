import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css"
import roket from "./roket.png"

const Landingpage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToRegister = () => {
    navigate("/Registerpage")
  }
  const goToLogin = () => {
    navigate("/Loginpage")
  }

  return (
    <React.Fragment>
    <Navbar className="nav-portal" expand="lg">
      <Container>
        <Navbar.Brand href="#"><strong>Portal</strong>Freelance</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
          </Nav>
          <Nav className="d-flex">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Career</Nav.Link>
            <Nav.Link href="#action2">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="box">
    <img className="roket" src={roket} alt="" />
      <div className="column">
        <span className="title">Hallo, Selamat Datang</span>
        <h1 className="sub"><strong>Temukan pekerjaan Freelance Impianmu</strong></h1>
        <br />
        <span className="end">Daftar sekarang Gratis loh !</span>
        <button onClick={() => goToRegister()} className="daftar"><strong>Daftar</strong></button>
        <button onClick={() => goToLogin()} className="login"><strong>Login</strong></button>
      </div>
    </div>
    </React.Fragment>
  );
};

export default Landingpage;
