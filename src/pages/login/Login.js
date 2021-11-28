/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import Brand from "../../components/brand/Brand";
import {
  Row,
  Col,
  Tabs,
  Tab,
  FloatingLabel,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
// import { useDispatch } from "react-redux";
// import { addId } from "../../stores/Id";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setCookie } from "nookies";

const QUERY_LOGIN = gql`
  query MyQuery($email: String!, $password: String!) {
    users(
      where: { _and: {}, email: { _eq: $email }, password: { _eq: $password } }
    ) {
      id
      email
      name
    }
  }
`;

const INSERT_USERS = gql`
  mutation MyMutation($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;
const Login = () => {
  // const { data, loading, error } = useQuery(QUERY_PROPERTIES);
  const [insertMessage, { data, loading: loadingM, error: errorM }] =
    useMutation(INSERT_USERS, {
      onError(error) {
        console.log(error);
      },
    });
  const [doLogin, { data: dataLogin, loading: dataLoading }] =
    useLazyQuery(QUERY_LOGIN);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState("signin");
  const [nameUp, setNameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [password1Up, setPassword1Up] = useState("");
  const [password2Up, setPassword2Up] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPassword1, setValidPassword1] = useState(false);
  const [validPassword2, setValidPassword2] = useState(false);
  const nameRegex = /^[a-zA-Z\s]{2,40}$/;
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  useEffect(() => {
    if (dataLogin?.users.length > 0) {
      // dispatch(addId(dataLogin?.users[0].id));
      setCookie(null, "idLogin", dataLogin?.users[0].id, {
        maxAge: 3 * 60 * 60,
      });
      Swal.fire("Sig In Success!", "You can open wishlist and chat", "success");
      navigate("/");
    }
    if (dataLogin?.users.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email or  Password wrong!",
      });
    }
  }, [dataLogin]);

  useEffect(() => {
    if (errorM) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already registered!",
      });
    }
  }, [errorM]);

  useEffect(() => {
    if (data !== undefined) {
      setEmailUp("");
      setNameUp("");
      setPassword1Up("");
      setPassword2Up("");
      Swal.fire("Sign up success!", "You can Sign In now!", "success");
      navigate("/login");
    }
  }, [data]);
  if (dataLoading || loadingM) {
    return (
      <div
        style={{
          margin: "100px",
          // textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "inherit",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  const handleChangeNameUp = (e) => {
    setNameUp(e.target.value);
    if (!nameRegex.test(e.target.value)) {
      setErrorName("The name must be a letter 2-40.");
      setValidName(false);
    } else {
      setErrorName("");
      setValidName(true);
    }
  };
  const handleChangeEmailUp = (e) => {
    setEmailUp(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setErrorEmail("Wrong email format.");
      setValidEmail(false);
    } else {
      setValidEmail(true);
      setErrorEmail("");
    }
  };
  const handleChangePassword1Up = (e) => {
    setPassword1Up(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setErrorPassword(
        "Password format must contain uppercase letters, lowercase letters, and numbers."
      );
      setValidPassword1(false);
    } else {
      setValidPassword1(true);
      setErrorPassword("");
    }
  };
  const handleChangePassword2Up = (e) => {
    setPassword2Up(e.target.value);
    if (e.target.value !== password1Up) {
      setErrorPassword2("Passwords are not the same.");
      setValidPassword2(false);
    } else {
      setValidPassword2(true);
      setErrorPassword2("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    doLogin({
      variables: {
        email: emailIn.toLowerCase(),
        password: passwordIn,
      },
    });
    setEmailIn("");
    setPasswordIn("");
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (validEmail && validName && validPassword1 && validPassword2) {
      insertMessage({
        variables: {
          object: {
            name: nameUp,
            email: emailUp.toLowerCase(),
            password: password2Up,
          },
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form format is wrong!",
      });
    }
  };

  return (
    <>
      {" "}
      <div style={{ textAlign: "center", margin: "50px" }}>
        <Brand />
        <br />
        <h2>Sorry, You have to login first. </h2>
      </div>
      <Row className="justify-content-center" style={{ margin: "20px" }}>
        <Col lg={3}>
          <Tabs
            // style={{ backgroundColor: "gray", color: "white" }}
            id=" controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 justify-content-center "
          >
            <Tab eventKey="signin" title="Sign In">
              <form onSubmit={handleLogin}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={emailIn}
                    onChange={(e) => {
                      setEmailIn(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    onChange={(e) => {
                      setPasswordIn(e.target.value);
                    }}
                    type="password"
                    placeholder="Password"
                    value={passwordIn}
                  />
                </FloatingLabel>
                <p
                  style={{
                    textAlign: "right",
                    fontSize: "14px",
                    color: "gray",
                  }}
                >
                  Forgot password?
                </p>
                <Row
                  className="justify-content-center"
                  style={{ margin: "20px 10px 20px 10px" }}
                >
                  {" "}
                  <Button
                    type="submit"
                    onSubmit={handleLogin}
                    variant="dark"
                    style={{
                      paddingLeft: "70px",
                      paddingRight: "70px",
                      alignContent: "center",
                      width: "auto !important",
                    }}
                  >
                    Sign In
                  </Button>{" "}
                </Row>
              </form>
            </Tab>
            {/* tab 2 */}
            <Tab eventKey="signup" title="Sign Up">
              <form onSubmit={handleSignup}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={nameUp}
                    onChange={handleChangeNameUp}
                  />
                  <Form.Text className="formText" style={{ color: "red" }}>
                    {errorName}
                  </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={emailUp}
                    onChange={handleChangeEmailUp}
                  />
                  <Form.Text className="formText" style={{ color: "red" }}>
                    {errorEmail}
                  </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password1Up}
                    onChange={handleChangePassword1Up}
                  />{" "}
                  <Form.Text className="formText" style={{ color: "red" }}>
                    {errorPassword}
                  </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Retry password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Retry password "
                    value={password2Up}
                    onChange={handleChangePassword2Up}
                  />
                  <Form.Text className="formText" style={{ color: "red" }}>
                    {errorPassword2}
                  </Form.Text>
                </FloatingLabel>
                <Row
                  className="justify-content-center"
                  style={{ margin: "20px 10px 20px 10px" }}
                >
                  {" "}
                  <Button
                    onSubmit={handleSignup}
                    type="submit"
                    variant="dark"
                    style={{
                      paddingLeft: "70px",
                      paddingRight: "70px",
                      alignContent: "center",
                      width: "auto !important",
                    }}
                  >
                    Sign Up
                  </Button>{" "}
                  <div
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <p>
                      By register I agree
                      <br />
                      <tag style={{ color: "blue" }}>
                        Terms and Conditions and Privacy Policy
                      </tag>{" "}
                    </p>
                  </div>
                </Row>
              </form>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};
export default Login;
