/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { parseCookies } from "nookies";
import {
  Container,
  Figure,
  Spinner,
  Button,
  Col,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import { MdVerifiedUser } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import "./Chat.css";
import { gql, useSubscription, useMutation } from "@apollo/client";
import Error404 from "../../components/error/Error404";
import moment from "moment";

const SubscribeChat = gql`
  subscription MySubscription {
    chats {
      id
      text
      created_at
      user_id
    }
  }
`;

const InsertChat = gql`
  mutation MyMutation($text: String!, $user_id: Int!) {
    insert_chats_one(object: { text: $text, user_id: $user_id }) {
      id
    }
  }
`;

const Chat = () => {
  const { data, loading, error } = useSubscription(SubscribeChat);
  const [AddChat, { loading: loadingAdd, error: errorAdd }] =
    useMutation(InsertChat);
  const navigate = useNavigate();
  const idLogin = parseInt(parseCookies("idLogin").idLogin);
  const [text, setText] = useState(
    "Hello admin, I am interested in this property. Can I find out more about it?"
  );

  useEffect(() => {
    if (idLogin === undefined || isNaN(idLogin)) {
      navigate("/login");
    }
  }, []);
  const scrollContainerStyle = {
    width: "auto",
    maxHeight: "500px",
    marginBottom: "20px",
  };
  if (loading || loadingAdd) {
    return (
      <div
        style={{
          margin: "100px",
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
  if (error || errorAdd) {
    return <Error404 />;
  }
  const handleSubmit = () => {
    AddChat({
      variables: {
        user_id: idLogin,
        text: text,
      },
    });
    setText("");
  };
  return (
    <>
      {" "}
      <Container
        fluid
        style={{
          backgroundColor: "#E0E0E0",
          height: "197px",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: "60px" }}>
          <h2>CHAT</h2>
          <h5>ACCOUNT / CHAT</h5>
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
                    style={{
                      objectFit: "contain",
                      borderRadius: "50%",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  as={Link}
                  to="/myaccount"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    backgroundColor: "#F2F2F2",
                    height: "28px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  My Account
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
              <img
                alt="brand"
                src="/logo192.png"
                height={40}
                style={{ margin: "10px" }}
              />{" "}
              <MdVerifiedUser style={{ color: "#27AE60" }} />
              <MDBContainer>
                <div
                  className="scrollbar scrollbar-secondary  mt-5 mx-auto"
                  style={scrollContainerStyle}
                >
                  <div
                    style={{
                      backgroundColor: "#F2F2F2",
                      borderRadius: "25px",
                      width: "600px",
                    }}
                  >
                    {" "}
                    <p style={{ margin: "20px", marginBottom: "0px" }}>
                      Hello, if you are interested in the property, please
                      inquire further with us. We are ready to serve you and
                      make transactions easier. We are available 24/7.
                    </p>
                    {/* <Row>
                      {" "}
                      <Col lg={10}></Col>{" "}
                      <Col style={{ fontSize: "12px" }} lg={2}>
                        20.18{" "}
                      </Col>
                    </Row> */}
                  </div>{" "}
                  {data?.chats.map((v) => {
                    if (v.user_id === idLogin) {
                      return (
                        <div
                          style={{
                            backgroundColor: "#092C4C",
                            color: "white",
                            borderRadius: "25px",
                            width: "600px",
                          }}
                        >
                          <p
                            style={{
                              margin: "20px",
                              marginTop: "10px",
                              marginBottom: "0px",
                            }}
                          >
                            {v.text}
                          </p>
                          <Row>
                            {" "}
                            <Col lg={9}></Col>{" "}
                            <Col style={{ fontSize: "12px" }} lg={3}>
                              {moment(v.created_at).format("lll")}
                            </Col>
                          </Row>
                        </div>
                      );
                    }
                  })}
                </div>
              </MDBContainer>
              <form onSubmit={handleSubmit}>
                {" "}
                <InputGroup className="mb-3">
                  <FormControl
                    as="textarea"
                    style={{
                      borderRadius: "20px",
                      borderColor: "#092C4C",
                    }}
                    size="sm"
                    placeholder="write a message...."
                    aria-label="write a message...."
                    aria-describedby="basic-addon2"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    value={text}
                  />
                  <Button
                    variant="outadsa"
                    id="button-addon2"
                    size="sm"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    <RiSendPlane2Fill size={25} color="#092C4C" />
                  </Button>
                </InputGroup>
              </form>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Chat;
