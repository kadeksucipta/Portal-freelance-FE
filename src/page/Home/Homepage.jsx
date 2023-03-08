import {
  faLocation,
  faLocationCrosshairs,
  faLocationDot,
  faPlus,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Homepage.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Landingpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToDetaildesain = () => {
    navigate("/Detaildesain");
  };
  const goToTambahloker = () => {
    navigate("/Tambahloker");
  };
  const goToContact = () => {
    navigate("/Contactpage");
  };
  const goToProfile = () => {
    navigate("/Profilepage");
  };

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [select, setSelect] = useState([]);
  const [tags, setTags] = useState([]);
  const [payload, setPayload] = useState([]);
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    fetchProducts();
    fetchTags();
   
  }, []);

  const fetchProducts = () => {
    fetch(`https://strange-clam-battledress.cyclic.app/api/products?q=${keyword}&skip=0&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const handleClick = (category) => {
    setSelect(category);
    fetch(`https://strange-clam-battledress.cyclic.app/api/products?limit=50&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const fetchTags = () => {
    fetch(`https://strange-clam-battledress.cyclic.app/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };

  const handleTags = (tags) => {
    fetch(`https://strange-clam-battledress.cyclic.app/api/products?limit=50&tags=${tags}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const apply = () => {
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
      title: "Lamaran Anda sudah diresponse",
      text: "Mohon tunggu konfirmasi selanjutnya dari kami.",
      icon: "success",
      button: false,
      timer: 2000,
    });
  }

  const searchHandler = (query) => {
    setKeyword(query);
  };

  const requestButton = () => {
    fetchProducts();
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
              <Nav.Link onClick={() => goToProfile()}>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link active>Home</Nav.Link>
              <Nav.Link onClick={() => goToContact()}>Contact</Nav.Link>
              <Nav.Link onClick={() => goToTambahloker()}>
                <FontAwesomeIcon icon={faPlus} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="box-home">
        <h1 style={{ textAlign: "center" }}>
          <strong>TEMUKAN PEKERJAAN FREELANCE IMPIANMU !</strong>
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            onChange={(e) => searchHandler(e.target.value)}
            className="search-home"
            type="text"
            placeholder="cari pekerjaan..."
          />
          <button
            onClick={() => requestButton()}
            style={{ height: "30px", width: "40px", border: "none" }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="tag-job-atas">
          {tags?.map((item, index) => (
            <button
              key={index}
              value={tags}
              className="button-job-atas"
              onClick={() => handleTags(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="container-job">
        <div className="job-card">
          {products.length === 0 && (
            <span
              style={{
                marginLeft: "40%",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              Pekerjaan kosong :(
            </span>
          )}
          {products?.map((item, index) => (
            <Card
              key={index}
              style={{
                width: "18rem",
                marginLeft: "60px",
         
                marginBottom: "20px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <Card.Img
                variant="top"
                src={"https://strange-clam-battledress.cyclic.app/images/" + item.image_url}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.jenis}</Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faLocationDot} /> {item.location}
                </Card.Text>
                <Card.Text>{item.category.name}</Card.Text>
                {item?.tags?.map((value, index) => (
                  <Button key={index} className="tag-job">
                    {value.name}
                  </Button>
                ))}

                <Button
                onClick={() => apply()}
                  className="detail-btn"
                >
                  Apply
                </Button>
              </Card.Body>
            </Card>
          ))}
          

          {/* {payload?.map((item, index) => (
            <Card
              key={index}
              style={{
                width: "18rem",
                marginLeft: "60px",
                marginRight: "10px",
                marginBottom: "20px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <div className="image">
              <Card.Img
                variant="top"
                src={"http://localhost:8000/images/" + item.image_url}
              />
              </div>
              <div className="details">
              <div className="center">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.jenis}</Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faLocationDot} /> {item.location}
                </Card.Text>
                <Card.Text>{item.category.name}</Card.Text>
                {item?.tags?.map((value, index) => (
                  <Button key={index} className="tag-job">
                    {value.name}
                  </Button>
                ))}

                <Button
                 
                  className="detail-btn"
                >
                  Detail
                </Button>
              </Card.Body>
              </div>
              </div>
            </Card>
          ))} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landingpage;
