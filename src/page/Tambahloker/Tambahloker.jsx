import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Tambahloker.css"

const Tambahloker = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToDetaildesain = () => {
    navigate("/Detaildesain")
  }
  const goToHome = () => {
    navigate("/Homepage")
  }
  const goToContact = () => {
    navigate("/Contactpage")
  }
  const goToProfile = () => {
    navigate("/Profilepage")
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
    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
        body: JSON.stringify(payload),

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
    goToHome()
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
              <Nav.Link onClick={() => goToContact()}>Contact</Nav.Link>
              <Nav.Link active ><FontAwesomeIcon icon={faPlus} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card>
        <Card.Header className="header-loker" as="h6">Punya Lowongan Pekerjaan ?</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="column-form">
            <Form.Group className="mb-3">
              <Form.Label><strong>Nama Perusahaan</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, perusahaan: e.target.value})} type="text" placeholder="Nama perusahaan..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Bidang</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, bidang: e.target.value})} type="text" placeholder="Pekerjaan..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Lokasi</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, location: e.target.value})} type="text" placeholder="Lokasi..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Jenis pekerjaan</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, jenis: e.target.value})} type="text" placeholder="disabled" disabled/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Waktu</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, waktu: e.target.value})} type="text" placeholder="Waktu" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Kualifikasi</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, kualifikasi: e.target.value})} type="text" placeholder="Kualifikasi" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Deskripsi</strong></Form.Label>
              <Form.Control onChange={e => setPayload({...payload, deskripsi: e.target.value})} as="textarea" rows={5} type="text" placeholder="Deskripsi..." />
            </Form.Group>
            </div>
          </Card.Text>
          <Button onClick={() => submitJob()} className="btn-loker">Kirim</Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Tambahloker;
