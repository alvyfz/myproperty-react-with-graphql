import {
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import Error404 from "../../components/error/Error404";

const INSERT_CONTACT = gql`
  mutation MyMutation($object: contact_user_insert_input!) {
    insert_contact_user_one(object: $object) {
      id
    }
  }
`;
const ContactUs = () => {
  const [insertMessage, { loading, error }] = useMutation(INSERT_CONTACT);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const nameRegex = /^[a-zA-Z\s]{2,40}$/;
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const [message, setMessage] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (!nameRegex.test(e.target.value)) {
      setErrorName("The name must be a letter 2-40.");
    } else {
      setErrorName("");
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setErrorEmail("Wrong email format.");
    } else {
      setErrorEmail("");
    }
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

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

  if (error) {
    return <Error404 />;
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    insertMessage({
      variables: { object: { name: name, email: email, message: message } },
    });
    setName("");
    setEmail("");
    setMessage("");
    return Swal.fire("Good job!", "Your message has been sent!", "success");
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
          <h2>CONTACT US</h2>
          <h5>ACCOUNT / CONTACT US</h5>
        </div>
      </Container>
      <Row className="justify-content-center">
        {/* <Col lg={6}>
          <Carousel indicators={false} nextIcon="" nextLabel="" prevIcon="">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="First slide"
                height="643px"
                style={{ objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h1>
                  <strong>CONTACT US </strong>
                </h1>
                <h3>
                  {" "}
                  <strong> Don't be shy, ask the PropertySquad.</strong>
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>{" "} */}
        <Col
          lg={6}
          style={{
            backgroundColor: "#E0E0E0",
            marginBottom: "100px",
            marginTop: "50px", // border: "1px solid grey",
            paddingTop: "20px",
            minheight: "465px",
            borderRadius: "40px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>
            What's your problem? Tell me please...
          </h4>
          <form
            onSubmit={handleSubmit}
            name="myForm"
            style={{ margin: "40px 50px 30px 50px" }}
          >
            <FloatingLabel
              controlId="floatingPassword"
              label="Your Name Here..."
              className="mb-3"
            >
              {/* <Form.Label>
                  Full Name<tag>*</tag>
                </Form.Label> */}
              <Form.Control
                onChange={handleChangeName}
                id="fullname"
                size="sm"
                type="text"
                placeholder="Your Name Here..."
                value={name}
              />
              <Form.Text className="formText" style={{ color: "red" }}>
                {errorName}
              </Form.Text>
            </FloatingLabel>
            {/* <Form.Label>
                  Email<tag>*</tag>
                </Form.Label> */}
            <FloatingLabel
              controlId="floatingPassword"
              label="Your Email Here..."
              className="mb-3"
            >
              <Form.Control
                size="sm"
                id="email"
                type="email"
                placeholder="Your Email Here..."
                onChange={handleChangeEmail}
                value={email}
              />
              <Form.Text className="formText" style={{ color: "red" }}>
                {errorEmail}
              </Form.Text>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Your Problem Text Here...."
              className="mb-3"
            >
              {/* <Form.Label>Message</Form.Label> */}
              <Form.Control
                id="message"
                as="textarea"
                rows={3}
                placeholder="Your Problem Text Here...."
                value={message}
                onChange={handleChangeMessage}
              />
            </FloatingLabel>
            <Button
              onSubmit="{handleSubmit}"
              type="submit"
              variant="light"
              id="button"
              style={{ width: "630px" }}
            >
              Submit
            </Button>{" "}
          </form>
        </Col>
      </Row>{" "}
    </>
  );
};
export default ContactUs;
