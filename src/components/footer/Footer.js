import { Container, Row, Col } from "react-bootstrap";
import Brand from "../brand/Brand";
export default function Footer() {
  return (
    <>
      <Container
        style={{ textAlign: "left", marginBottom: "50px", marginTop: "50px" }}
      >
        <Row>
          <Col lg={6}>
            <Brand />
            <p style={{ marginLeft: "13px", fontSize: "14px" }}>
              My Property is a web-based application that provides products and
              services for property purchases. My Property can facilitate
              property transactions that were previously complicated to become
              easier and more flexible. My Property is intended for millennials
              who have difficulty finding the property they want.
            </p>
          </Col>
          <Col lg={6}>
            <Row style={{ marginTop: "20px" }}>
              <Col lg={4}>
                <>
                  <h6 style={{ fontWeight: "600" }}>INFORMATION</h6>
                  <br />
                  <dl style={{ fontSize: "14px" }}>
                    <dd>Home</dd>
                    <dd>Properties</dd>
                    <dd>Promo</dd>
                    <dd>Categories</dd>
                    <dd>Contact Us</dd>
                  </dl>
                </>
              </Col>
              <Col lg={4}>
                <>
                  <h6 style={{ fontWeight: "600" }}>EXTRA</h6>
                  <br />
                  <dl style={{ fontSize: "14px" }}>
                    <dd>Privacy Policy</dd>
                    <dd>Shopping Guide</dd>
                    <dd>Term and Condition</dd>
                    <dd>Return Policy</dd>
                  </dl>
                </>
              </Col>
              <Col lg={4}>
                {" "}
                <>
                  <h6 style={{ fontWeight: "600" }}>MY ACCOUNT</h6>
                  <br />
                  <dl style={{ fontSize: "14px" }}>
                    <dd>My Account</dd>

                    <dd>Wishlist</dd>
                  </dl>
                </>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
