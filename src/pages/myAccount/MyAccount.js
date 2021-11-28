/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Row,
  Col,
  Figure,
  Spinner,
  Button,
  Modal,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GETDATA = gql`
  query MyQuery($id: Int!) {
    users_by_pk(id: $id) {
      email
      id
      name
    }
  }
`;
const UPDATENAME = gql`
  mutation MyMutation($id: Int!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      name
      id
    }
  }
`;
const UPDATEPASSWORD = gql`
  mutation MyMutation($new_password: String!, $id: Int!, $password: String!) {
    update_users(
      where: { id: { _eq: $id }, _and: { password: { _eq: $password } } }
      _set: { password: $new_password }
    ) {
      returning {
        id
        email
      }
    }
  }
`;
const MyAccount = () => {
  const [name, setName] = useState("");
  const [validPassword2, setValidPassword2] = useState(false);
  const [validPassword1, setValidPassword1] = useState(false);
  const [errorPassword1, setErrorPassword1] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const idLogin = parseInt(parseCookies("idLogin").idLogin);
  const [getData, { data, loading }] = useLazyQuery(GETDATA);
  const [updateName, { loading: loadingUpdate }] = useMutation(UPDATENAME);
  const [updatePassword, { data: dataUpdate, loading: loadingPassword }] =
    useMutation(UPDATEPASSWORD);
  const navigate = useNavigate();
  const user = data?.users_by_pk;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  useEffect(() => {
    getData({
      variables: {
        id: idLogin,
      },
    });
  }, []);
  useEffect(() => {
    if (dataUpdate?.update_users.returning.length === 1) {
      setPassword1("");
      setPassword2("");
      setOldPassword("");
      navigate("/myaccount");
      // setModalShow2(false);

      Swal.fire(
        "Change password success!",
        "Remember your new password!",
        "success"
      );

      // navigate("/myaccount");
    } else if (dataUpdate?.update_users.returning.length === 0) {
      setPassword1("");
      setPassword2("");
      setOldPassword("");

      navigate("/myaccount");
      // setModalShow2(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Old password wrong!",
      });
    }
  }, [dataUpdate]);

  if (loading) {
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

  const handleUpdateName = () => {
    updateName({ variables: { id: idLogin, name: name } });
    Swal.fire("Change name success!", "", "success");
    setModalShow(false);
    navigate("/myaccount");
    setName("");
  };
  const handleChangePassword = (e) => {
    setPassword1(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setErrorPassword1(
        "Password format must contain uppercase letters, lowercase letters, and numbers."
      );
      setValidPassword1(false);
    } else {
      setValidPassword1(true);
      setErrorPassword1("");
    }
  };
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
    if (e.target.value !== password1) {
      setErrorPassword2("Passwords are not the same.");
      setValidPassword2(false);
    } else {
      setValidPassword2(true);
      setErrorPassword2("");
    }
  };
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleUpdatePassord = (e) => {
    e.preventDefault();

    if (validPassword1 && validPassword2) {
      if (dataUpdate?.update_users.returning.length === undefined) {
        updatePassword({
          variables: {
            id: idLogin,
            password: oldPassword,
            new_password: password2,
          },
        });
      } else if (dataUpdate?.update_users.returning.length !== 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you just changed your password, can't change it again!",
        });
      }
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
      <Container
        fluid
        style={{
          backgroundColor: "#E0E0E0",
          height: "197px",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: "60px" }}>
          <h2>MY ACCOUNT</h2>
          <h5>MY ACCOUNT / DETAIL ACCOUNT </h5>
        </div>
      </Container>
      <Container style={{ marginTop: "20px", marginBottom: "250px" }}>
        <Row className="justify-content-center">
          <Col lg={4}>
            <Container style={{ border: "2px solid #E0E0E0" }}>
              <Row style={{ margin: "10px" }}>
                <Col lg={4}>
                  <Figure.Image
                    width={60}
                    height={60}
                    alt="171x180"
                    src="https://cdn.dribbble.com/users/112330/screenshots/16462649/media/7d0abc3a695db549779190d707388197.png?compress=1&resize=1000x750"
                    style={{ objectFit: "contain", borderRadius: "50%" }}
                  />{" "}
                </Col>
                <Col lg={8} style={{ textAlign: "left" }}>
                  <h4 style={{ marginTop: "10px" }}> {user?.name}</h4>
                </Col>
              </Row>
              <Row>
                <Col
                  as={Link}
                  to="/chat"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    backgroundColor: "#F2F2F2",
                    height: "28px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Chat
                </Col>
              </Row>{" "}
              <Row>
                <Col
                  as={Link}
                  to="/wishlist"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    backgroundColor: "#F2F2F2",
                    height: "28px",
                    fontWeight: "500",
                    fontSize: "20px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  Wishlist
                </Col>
              </Row>{" "}
            </Container>
          </Col>
          <Col lg={8}>
            <Container fluid style={{ border: "2px solid #E0E0E0" }}>
              <Row style={{ marginBottom: "18px", marginTop: "18px" }}>
                <Col lg={4}>
                  <Figure.Image
                    width={230}
                    height={230}
                    alt="171x180"
                    src="https://cdn.dribbble.com/users/112330/screenshots/16462649/media/7d0abc3a695db549779190d707388197.png?compress=1&resize=1000x750"
                    style={{ objectFit: "cover" }}
                  />{" "}
                </Col>
                <Col lg={8} style={{ color: "#828282" }}>
                  <h5>Change your account</h5>
                  <Row>
                    <Col lg={3}>Name</Col>
                    <Col lg={9}>
                      {user?.name}{" "}
                      <Button
                        variant="dad"
                        onClick={() => setModalShow(true)}
                        style={{ color: "#092C4C", fontWeight: "500" }}
                      >
                        Change
                      </Button>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        setName={setName}
                        name={name}
                        handleSubmit={handleUpdateName}
                        loading={loadingUpdate}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>Email</Col>
                    <Col lg={9}>{user?.email} </Col>
                  </Row>
                  <Button
                    onClick={() => setModalShow2(true)}
                    style={{
                      paddingLeft: "40px",
                      paddingRight: "40px",
                      marginTop: "20px",
                    }}
                    variant="outline-secondary"
                  >
                    {" "}
                    Change password
                  </Button>
                  <ChangePasswordModals
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                    handleSubmit={handleUpdatePassord}
                    oldPassword={oldPassword}
                    handleOldPassword={handleChangeOldPassword}
                    password={password1}
                    handlePassword={handleChangePassword}
                    errorPassword={errorPassword1}
                    password2={password2}
                    handlePassword2={handleChangePassword2}
                    errorPassword2={errorPassword2}
                    loading={loadingPassword}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

function ChangePasswordModals(props) {
  return (
    <Modal
      {...props}
      //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change your password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Old password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              size="sm"
              placeholder="Old password"
              value={props.oldPassword}
              onChange={props.handleOldPassword}
            />
            <Form.Text className="formText" style={{ color: "red" }}>
              {props.errorOldPassword}
            </Form.Text>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="New password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              size="sm"
              placeholder="New password"
              value={props.password}
              onChange={props.handlePassword}
            />
            <Form.Text className="formText" style={{ color: "red" }}>
              {props.errorPassword}
            </Form.Text>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Retry new password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              size="sm"
              placeholder="Retry new password"
              value={props.password2}
              onChange={props.handlePassword2}
            />
            <Form.Text className="formText" style={{ color: "red" }}>
              {props.errorPassword2}
            </Form.Text>
          </FloatingLabel>
          <Button size="sm" variant="outline-dark" onClick={props.onHide}>
            Cancel
          </Button>
          &nbsp;
          <Button
            size="sm"
            type="submit"
            variant="dark"
            onSubmit={props.handleSubmit}
          >
            {props.loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <div>Save Changes</div>
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change your name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              size="sm"
              placeholder="Name"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
            />
          </FloatingLabel>
          <Button size="sm" variant="outline-dark" onClick={props.onHide}>
            Cancel
          </Button>
          &nbsp;
          <Button
            size="sm"
            type="submit"
            variant="dark"
            onSubmit={props.handleSubmit}
          >
            {props.loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <div>Save Changes</div>
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default MyAccount;
