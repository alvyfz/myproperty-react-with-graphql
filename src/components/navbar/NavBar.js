import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  FormControl,
  InputGroup,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

import { useState } from "react";
import { BsSearch, BsHeart, BsChatSquareText, BsPerson } from "react-icons/bs";
import Brand from "../brand/Brand";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import { addSearch } from "../../stores/Search";
import Swal from "sweetalert2";

export default function NavBar() {
  const navigate = useNavigate();
  const idLogin = parseInt(parseCookies("idLogin").idLogin);
  const handleLogout = () => {
    destroyCookie(null, "idLogin");
    Swal.fire("Sign out success!", "", "warning");
    navigate("/");
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="light"
        style={{ fontWeight: "600", fontSize: "15px" }}
      >
        <Container>
          <Navbar.Brand style={{ marginRight: "18%" }}>
            <Link to="/home">
              {" "}
              <Brand />{" "}
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                style={{ marginLeft: "15px", marginRight: "15px" }}
                to="/"
              >
                HOME
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/properties"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                PROPERTIES
              </Nav.Link>{" "}
              <NavDropdown
                title="CATEGORIES"
                id="collasible-nav-dropdown"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                <NavDropdown.Item as={Link} to="/categories/house">
                  HOUSE
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categories/apartement">
                  APARTEMENT{" "}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={Link}
                to="/contact-us"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                CONTACT US
              </Nav.Link>{" "}
            </Nav>

            <Nav>
              <Nav.Link style={{ marginLeft: "10px" }}>
                {" "}
                <OffCanvasExample placement="top" name="top" />
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/wishlist"
                eventKey={2}
                style={{ marginLeft: "10px" }}
              >
                <BsHeart size={20} />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                style={{ marginLeft: "10px" }}
                as={Link}
                to="/chat"
              >
                <BsChatSquareText size={20} />
              </Nav.Link>
              <NavDropdown
                title={<BsPerson size={20} />}
                id="collasible-nav-dropdown"
                style={{ marginLeft: "10px" }}
              >
                {idLogin === undefined || isNaN(idLogin) ? (
                  <>
                    <NavDropdown.Item as={Link} to="/login">
                      SIGN IN / SIGN UP
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    {" "}
                    <NavDropdown.Item as={Link} to="/myaccount">
                      MY ACCOUNT
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      SIGN OUT
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSearch(input));
    setInput("");
    navigate("/search");
    handleClose();
  };

  return (
    <>
      <BsSearch size={20} onClick={handleShow} />

      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ height: "90px" }}
      >
        <Offcanvas.Header closeButton>
          {/* <OffcanvasBody > */}
          <Container>
            <Row>
              <Col lg={3}>
                <p
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  SEARCH
                </p>
              </Col>
              <Col lg={7}>
                <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3" style={{ marginTop: "10px" }}>
                    <FormControl
                      placeholder="Search your property...."
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                      {" "}
                      <BsSearch />
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}
