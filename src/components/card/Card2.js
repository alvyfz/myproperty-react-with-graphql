import { Card, Button, Row, Col } from "react-bootstrap";

export default function CardProperty2({ name, price, img, button, category }) {
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
      <Card style={{ width: "355px", height: "291px", fontSize: "14px" }}>
        <Row>
          <Col md={5}>
            {" "}
            <Card.Img
              variant="left"
              src={img}
              style={{
                margin: "10px",
                marginTop: "5px",
                width: "151px",
                height: "178px",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col md={7}>
            <Card.Body style={{ textAlign: "left" }}>
              {" "}
              <Card.Title>{name}</Card.Title>
              <Card.Text> Modern desain house property millenials</Card.Text>
              <Card.Title style={{ fontSize: "14px" }}>
                <strong>{formatRupiah()}</strong>
              </Card.Title>
              <Button
                onClick={button}
                variant="dark"
                style={{ marginTop: "10px", fontSize: "10px" }}
              >
                Read more
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}
