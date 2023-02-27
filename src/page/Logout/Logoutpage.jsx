import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Button, Container, Modal, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Logoutpage.css"

const Logoutpage = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profilepage");
  };
  const goToPemesanan = () => {
    navigate("/Pemesanan");
  };
  const goToLogin = () => {
    navigate("/");
  };

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/auth/me`, {
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

      {/*---------------------------------------------------------*/}

      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
      <Modal.Dialog style={{border: "none", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
        <Modal.Header onClick={() => goToProfile()} className="header-logout" closeButton>
          <Modal.Title style={{fontSize: "20px"}}>Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Anda yakin ingin Logout.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => goToProfile()} className="btn-logout-no">Tidak</Button>
          <Button onClick={() => goToLogin()} className="btn-logout">Ya</Button>
        </Modal.Footer>
      </Modal.Dialog>
      </div>
    </React.Fragment>
  );
};

export default Logoutpage;
