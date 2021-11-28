import { Container, Row, Col } from "react-bootstrap";
import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <Container fluid>
        <Container
          style={{
            textAlign: "left",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <Row>
            <Col lg={6}>
              <Brand />
              <p style={{ fontSize: "14px" }}>
                My Property is a web-based application that provides products
                and services for property purchases. My Property can facilitate
                property transactions that were previously complicated to become
                easier and more flexible. My Property is intended for
                millennials who have difficulty finding the property they want.
              </p>
            </Col>
            <Col lg={6}>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>
                  <>
                    <h6 style={{ fontWeight: "600" }}>INFORMATION</h6>
                    <br />
                    <dl style={{ fontSize: "14px" }}>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/"
                        >
                          {" "}
                          Home{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/properties"
                        >
                          {" "}
                          Properties{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/categories/house"
                        >
                          {" "}
                          House{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/categories/apartement"
                        >
                          {" "}
                          Apartement{" "}
                        </Link>
                      </dd>
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/contact-us"
                        >
                          {" "}
                          Contact Us{" "}
                        </Link>
                      </dd>
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
                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/myaccount"
                        >
                          {" "}
                          My Account{" "}
                        </Link>
                      </dd>

                      <dd>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/wishlist"
                        >
                          {" "}
                          Wishlist{" "}
                        </Link>
                      </dd>
                    </dl>
                  </>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
