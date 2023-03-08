import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Container, Modal, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMailBulk, faMailForward, faMailReply, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Profilepage.css"

const Profilepage = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToContact = () => {
    navigate("/Contactpage");
  };
  const goToHome = () => {
    navigate("/Homepage");
  };
  const goToLogout = () => {
    navigate("/Logoutpage");
  };
  const goToTambahloker = () => {
    navigate("/Tambahloker")
  }

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`https://strange-clam-battledress.cyclic.app/auth/me`, {
      method: "GET",
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  };

  return (
    <React.Fragment>
      <Navbar className="nav-portal" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <strong>Portal</strong>Freelance
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <select
                style={{
                  borderRadius: "4px",
                  background: "white",
                  color: "black",
                  border: "none",
                }}
                title="Category"
                id="navbarScrollingDropdown"
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value="Semua Pekerjaan"
                >
                  Semua Pekerjaan
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Part time"
                >
                  Part time
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Full time"
                >
                  Full time
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Remote"
                >
                  Remote
                </option>
              </select>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link active><FontAwesomeIcon icon={faUser} /></Nav.Link>
              <Nav.Link onClick={() => goToHome()}>Home</Nav.Link>
              <Nav.Link onClick={() => goToContact()}>Contact</Nav.Link>
              <Nav.Link onClick={() => goToTambahloker()}><FontAwesomeIcon icon={faPlus} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*---------------------------------------------------------*/}

      <Card style={{border: "none", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className="card-profile">
        <Card.Header className="header-profile">
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link onClick={() => goToProfile()} href="#first">
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{color: "white"}} onClick={() => goToLogout()}>Log Out</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <hr style={{ width: "10%" }} />
          <Card.Text><FontAwesomeIcon icon={faUser}/>{" "}Name: {profile.full_name}</Card.Text>
          <Card.Text><FontAwesomeIcon icon={faEnvelope}/>{" "}Email: {profile.email}</Card.Text>
        </Card.Body>
        <Card.Footer className="footer-profile">Hello User !</Card.Footer>
        
      </Card>
    </React.Fragment>
  );
};

export default Profilepage;
