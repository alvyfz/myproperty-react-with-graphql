import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CardProperty1({ name, price, img, idx, category }) {
  const formatRupiah = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <>
      {" "}
      <Card style={{ width: "200px" }}>
        <Card.Img
          variant="top"
          src={img}
          style={{ height: "216px", objectFit: "cover" }}
        />
        <Card.Body>
          <Row style={{ fontSize: "14px" }}>
            <Col style={{ textAlign: "left" }}>
              {" "}
              <Card.Text>
                {name}
                <br />
                <p> {category}</p>
                <strong>{formatRupiah()} </strong>
              </Card.Text>
            </Col>
            <Col style={{ textAlign: "left" }}>
              <Link to={`/properties/${idx}`}>
                <Button
                  variant="dark"
                  style={{ marginTop: "10px", fontSize: "10px" }}
                >
                  Read more
                </Button>{" "}
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
