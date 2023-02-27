import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Registerpage.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../src/App/features/Login/Actions";
import userlogin from "../Login/user.png";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToLogin = () => {
    dispatch(setUserData(user));
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [select, setSelect] = useState([]);

  const fetchLogin = (formData) => {
    fetch(`http://localhost:8000/auth/register`, {
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
        goToLogin();
        console.log(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      return setError(true);
    }
    console.log(name);
    console.log(select);
    const formData = new URLSearchParams({
      full_name: name,
      email,
      password,
      role: select,
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
      <div className="container-register">
        <div className="box-register">
          <div className="card-register">
            <div className="user">
              <img style={{ width: "100px" }} src={userlogin} alt="" />
            </div>
            <h2 style={{ textAlign: "center" }}>Hello People</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <div>
                  <Form.Label>
                    <strong>Name</strong>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    placeholder="Enter name"
                  />
                </div>
                {error && name.length <= 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Nama tidak boleh kosong !
                  </label>
                ) : (
                  ""
                )}
                {error && name.length > 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Nama minimal 8 karakter !
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div>
                  <Form.Label>
                    <strong>Email address</strong>
                  </Form.Label>
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
                  <Form.Label>
                    <strong>Password</strong>
                  </Form.Label>
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

              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Role</strong>
                </Form.Label>
                <div>
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      background: "none",
                      cursor: "pointer",
                    }}
                    className="role-input"
                    name=""
                    id="role"
                    placeholder="select"
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option disabled hidden selected>
                      select role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                {error && select.length <= 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Pilih role Anda !
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
                Sign In
              </Button>
              <div
                style={{ justifyContent: "center", alignItems: "center" }}
                className="d-flex"
              ></div>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
