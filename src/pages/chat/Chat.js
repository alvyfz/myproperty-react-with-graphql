/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { parseCookies } from "nookies";
import {
  Container,
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
import {
  gql,
  useSubscription,
  useMutation,
  // useLazyQuery,
  useQuery,
} from "@apollo/client";
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

// const PROPERTIES = gql`
//   query MyQuery($id: Int!) {
//     properties_by_pk(id: $id) {
//       id
//       img
//       name
//       price
//     }
//   }
// `;

const QueryProperties = gql`
  query MyQuery2 {
    properties {
      id
      img
      name
      price
    }
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idProperty = parseInt(query.get("id"));
  const idLogin = parseInt(parseCookies("idLogin").idLogin);
  const { data, error, loading } = useSubscription(SubscribeChat);
  // const [getProperties, { data: dataProperties, loading: loadingProperties }] =
  //   useLazyQuery(PROPERTIES);
  const {
    data: dataProperty,
    loading: loadingProperty,
    error: errorProperty,
  } = useQuery(QueryProperties);
  const [AddChat, { error: errorAdd, loading: loadingAdd }] =
    useMutation(InsertChat);
  const property = dataProperty?.properties.find((v) => v.id === idProperty);
  const [text, setText] = useState("");
  useEffect(() => {
    if (idLogin === undefined || isNaN(idLogin)) {
      navigate("/login");
    }
  }, []);
  // useEffect(() => {
  //   getProperties({ variables: { id: idProperty } });
  // }, []);
  const scrollContainerStyle = {
    width: "auto",
    maxHeight: "400px",
    marginBottom: "20px",
  };

  useEffect(() => {
    if (property) {
      const textIsi = `Hello admin, I am interested in ${property?.name}. Can I find out more about it?`;
      setText(textIsi);
    }
  }, [loadingProperty]);
  // if (loadingProperties) {
  //   if (idProperty) {
  //     const textIsi = `Hello admin, I am interested in ${property?.name}. Can I find out more about it?`;
  //     setText(textIsi);
  //   }
  // }
  console.log(data?.chats);
  // if (loadingProperty) {
  //   return (
  //     <div
  //       style={{
  //         margin: "100px",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "inherit",
  //       }}
  //     >
  //       <Spinner animation="border" />
  //     </div>
  //   );
  // }
  if (error || errorAdd || errorProperty) {
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
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
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
                  {/* <Figure.Image
                    width={60}
                    height={60}
                    alt="171x180"
                    src="https://cdn.dribbble.com/users/112330/screenshots/16462649/media/7d0abc3a695db549779190d707388197.png?compress=1&resize=1000x750"
                    style={{
                      objectFit: "contain",
                      borderRadius: "50%",
                    }}
                  /> */}
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
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  Wishlist
                </Col>
              </Row>{" "}
            </Container>
            {isNaN(idProperty) || idProperty === undefined ? null : (
              <Container
                style={{
                  border: "2px solid #E0E0E0",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {loadingProperty ? (
                  <Spinner animation="border" />
                ) : (
                  <>
                    {" "}
                    <h5 style={{ margin: "10px" }}>Property</h5>
                    <Row style={{ marginBottom: "10px" }}>
                      <Col lg={4}>
                        {" "}
                        <img
                          alt="photoProperty"
                          src={property?.img}
                          height={120}
                          width={120}
                          style={{ objectFit: "cover" }}
                        />
                      </Col>
                      <Col lg={7}>
                        <h5>{property?.name}</h5>
                        <h4>{formatRupiah(property?.price)}</h4>
                      </Col>
                    </Row>{" "}
                  </>
                )}
              </Container>
            )}
          </Col>

          <Col lg={8}>
            <Container fluid style={{ border: "2px solid #E0E0E0" }}>
              {loading ? (
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
              ) : (
                <>
                  {" "}
                  <img
                    alt="brand"
                    src="/logo192.png"
                    height={40}
                    style={{ margin: "10px" }}
                  />
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
                          maxWidth: "600px",
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
                              key={v.id}
                              style={{
                                backgroundColor: "#092C4C",
                                color: "white",
                                borderRadius: "25px",
                                maxWidth: "600px",
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
                                <Col
                                  style={{
                                    fontSize: "12px",
                                    textAlign: "right",
                                    marginLeft: "10px",
                                    // align: "left",
                                  }}
                                  xs={11}
                                >
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
                      {loadingAdd ? (
                        <Spinner size="sm" animation="grow" />
                      ) : (
                        <Button
                          variant="outadsa"
                          id="button-addon2"
                          size="sm"
                          type="submit"
                          onSubmit={handleSubmit}
                        >
                          <RiSendPlane2Fill size={25} color="#092C4C" />
                        </Button>
                      )}
                    </InputGroup>
                  </form>{" "}
                </>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Chat;
