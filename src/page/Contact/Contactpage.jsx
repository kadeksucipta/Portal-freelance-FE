import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Contactpage.css"
import swal from "sweetalert";

const Contactpage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate("/Profilepage");
  };
  const goToContact = () => {
    navigate("/Contactpage");
  };
  const goToHome = () => {
    navigate("/Homepage");
  };
  const goToTambahloker = () => {
    navigate("/Tambahloker")
  }

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [select, setSelect] = useState([]);
  const [tags, setTags] = useState([]);
  const [payload, setPayload] = useState({
    perusahaan: "",
    jenis: "",
    kualifikasi: "",
    location: "",
    waktu: "",
    deskripsi: "",
    bidang: ""
  })

  useEffect(() => {
    fetchProducts();
    fetchTags()
  }, []);

  const fetchProducts = () => {
    fetch(`http://localhost:8000/api/products?q=${keyword}&skip=0&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const handleClick = (category) => {
    setSelect(category);
    fetch(`http://localhost:8000/api/products?limit=50&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const fetchTags = () => {
    fetch(`http://localhost:8000/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };
  
  const submitJob = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:8000/api/delivery-addresses`, {
      method: "POST",
        body: JSON.stringify(payload),

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
    swal({
      title: "Masukan dikirim",
      text: "Terimakasi Sudah memberikan masukan :)",
      icon: "success",
      button: false,
      timer: 1000,
    });
  }

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
                onChange={(e) => {
                  handleClick(e.target.value);
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
              <Nav.Link onClick={() => goToProfile()}><FontAwesomeIcon icon={faUser} /></Nav.Link>
              <Nav.Link onClick={() => goToHome()}>Home</Nav.Link>
              <Nav.Link onClick={() => goToContact()} active>Contact</Nav.Link>
              <Nav.Link onClick={() => goToTambahloker()}><FontAwesomeIcon icon={faPlus} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{justifyContent: "center", alignItems: "center", marginLeft: "20px", marginRight: "20px", marginTop: "20px"}} className="d-block">
      <Card style={{border: "none", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
        <Card.Header className="header-contact" as="h6">Punya masalah atau masukan ?</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="column-contact">
            <Form.Group className="mb-3">
              <Form.Label><strong>Nama</strong></Form.Label>
              <Form.Control className="focus" onChange={e => setPayload({...payload, perusahaan: e.target.value})} type="text" placeholder="Nama..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Alamat Email</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, bidang: e.target.value})} type="text" placeholder="Email..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Masukan / Masalah</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, deskripsi: e.target.value})} as="textarea" rows={5} type="text" placeholder="..." />
            </Form.Group>
            </div>
          </Card.Text>
          <Button onClick={() => submitJob()} className="btn-loker">Kirim</Button>
        </Card.Body>
      </Card>
      </div>
    </React.Fragment>
  );
};

export default Contactpage;
