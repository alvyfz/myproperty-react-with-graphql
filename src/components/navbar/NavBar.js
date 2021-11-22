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
import { addSearch } from "../../stores/Search";

export default function NavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="light"
        style={{ fontWeight: "600" }}
      >
        <Container>
          <Navbar.Brand style={{ marginRight: "130px" }}>
            <Link to="/home">
              {" "}
              <Brand />{" "}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ marginLeft: "15px", marginRight: "15px" }}>
                {" "}
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/home"
                >
                  {" "}
                  HOME{" "}
                </Link>
              </Nav.Link>
              <Nav.Link
                href="#pricing"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                PROPERTIES
              </Nav.Link>{" "}
              <Nav.Link
                href="#pricing"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                PROMO
              </Nav.Link>{" "}
              <NavDropdown
                title="CATEGORIES"
                id="collasible-nav-dropdown"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                <NavDropdown.Item href="#action/3.1">HOUSE</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  APARTEMENT
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href="#pricing"
                style={{ marginLeft: "15px", marginRight: "15px" }}
              >
                CONTACT US
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets" style={{ marginLeft: "10px" }}>
                {" "}
                <OffCanvasExample placement="top" name="top" />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                style={{ marginLeft: "10px" }}
                href="#memes"
              >
                <BsHeart size={20} />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                style={{ marginLeft: "10px" }}
                href="#jejej"
              >
                <BsChatSquareText size={20} />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                style={{ marginLeft: "10px" }}
                href="#memes"
              >
                <BsPerson size={20} />
              </Nav.Link>
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
                      <BsSearch />{" "}
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
