import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Loginpage.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../src/App/features/Login/Actions";
import userlogin from "./user.png";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    dispatch(setUserData(user));
    navigate("./Homepage");
  };
  const goToRegister = () => {
    navigate("./Registerpage");
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const fetchLogin = (formData) => {
    fetch(`https://strange-clam-battledress.cyclic.app/auth/login`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 400) {
          return setError(true);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data.user, token: data.token }));

        createItem(data);
        goToHome();
        console.log(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      return setError(true);
    }
    const formData = new URLSearchParams({
      email,
      password,
    });
    fetchLogin(formData);
    console.log(email, password);
  };

  const createItem = (data) => {
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  return (
    <React.Fragment>
      <div className="container-login">
        <div className="box-login">
          <div className="card-login">
            <div className="user">
              <img style={{ width: "100px" }} src={userlogin} alt="" />
            </div>
            <h2 style={{ textAlign: "center" }}>Hello User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                  />
                </div>
                {error && email.length <= 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Email tidak boleh kosong !
                  </label>
                ) : (
                  ""
                )}
                {error && email.length > 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Email belum terdaftar !
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </div>

                {error && password.length <= 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Password tidak boleh kosong !
                  </label>
                ) : (
                  ""
                )}

                {error && password.length > 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Password salah !
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button
                onClick={() => handleSubmit()}
                className="btn-login"
                type="submit"
              >
                Login
              </Button>
              <hr />
              <div
                style={{ justifyContent: "center", alignItems: "center" }}
                className="d-flex"
              >
                <span>Belum punya akun?</span>
                <Nav.Link
                  onClick={() => goToRegister()}
                  style={{ color: "blue", marginLeft: "5px" }}
                >
                  Sign Up
                </Nav.Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
