import React from "react";
import { useState } from "react";
import $ from "jquery";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import "../css/Login.css";
import "../js/Login";
const API = require("../API.json");

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUpAsUser, setShowSignUpAsUser] = useState(true);
  const [showSignUpAsCompany, setshowSignUpAsCompany] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [website, setWebsite] = useState("");
  const [isCompany, setisCompany] = useState(false);
  const [url, setUrl] = useState(API.Main);

  const signup = () => {
    if (userName == "" || userPassWord == "" || userEmail == "") {
      alert("enter details");
    } else {
      POST_TO_DB();
    }
  };
  const signIn = () => {
    if (userEmail == userPassWord) {
      window.location = "#/home";
    }
  };
  const POST_TO_DB = () => {
    console.log("proceedig");
    const requestoptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassWord,
        isCompany: isCompany,
        website: website,
      }),
    };
    fetch(url + "addUser", requestoptions)
      .then((response) => {
        alert("please confirm your same password in your mail");
        setShowSignIn(true);
        setShowSignUp(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Container className="mb-2">
        <Row>
          <Col>
            <Button
              onClick={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }}
            >
              SignUp
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                setShowSignIn(true);
                setShowSignUp(false);
              }}
            >
              SignIn
            </Button>
          </Col>
        </Row>
      </Container>
      {showSignIn ? (
        <div>
          <div id="login" className="login mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={userPassWord}
                onChange={(e) => {
                  setUserPassWord(e.target.value);
                  setisCompany(false);
                }}
              />
            </FloatingLabel>
          </div>
          <Button onClick={() => signIn()}>Sign In</Button>
        </div>
      ) : (
        <></>
      )}

      {showSignUp ? (
        <>
          <Container>
            <Row>
              <Col>
                <Button
                  onClick={() => {
                    setShowSignUpAsUser(true);
                    setshowSignUpAsCompany(false);
                  }}
                >
                  sign up as user
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    setShowSignUpAsUser(false);
                    setshowSignUpAsCompany(true);
                  }}
                >
                  sign up as company
                </Button>
              </Col>
            </Row>
          </Container>

          {showSignUpAsUser ? (
            <div className="normal-user" id="normal-user">
              <h1>Sign Up as User to view Jobs</h1>

              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={userEmail}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={userPassWord}
                  onChange={(e) => {
                    setUserPassWord(e.target.value);
                    setisCompany(false);
                  }}
                />
              </FloatingLabel>
            </div>
          ) : (
            <div className="company-user" id="company-user">
              <h1>Sign Up as Company to Post Jobs</h1>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={userEmail}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={userPassWord}
                  onChange={(e) => {
                    setUserPassWord(e.target.value);
                    setisCompany(true);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Your Company Website"
                className="mb-3"
              >
                <Form.Control
                  type="url"
                  placeholder="www.dummy.com"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    setisCompany(true);
                  }}
                />
              </FloatingLabel>
            </div>
          )}
          <Button
            onClick={() => {
              signup();
            }}
          >
            SignUp
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
