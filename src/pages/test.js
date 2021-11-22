import {
  Offcanvas,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      onClick={handleShow}
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
              <Col lg={5}>
                <InputGroup className="mb-3" style={{ marginTop: "10px" }}>
                  <FormControl placeholder="Search your property...." />
                  <Button variant="outline-secondary" id="button-addon2">
                    {" "}
                    <BsSearch />{" "}
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

function Test() {
  return (
    <>
      <OffCanvasExample placement="top" name="top" />
    </>
  );
}

export default Test;
