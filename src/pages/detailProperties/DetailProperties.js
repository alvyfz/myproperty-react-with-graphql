/* eslint-disable array-callback-return */
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { BsHeartFill } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { parseCookies } from "nookies";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProperty1 from "../../components/card/Card";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import { QUERY } from "../wishlist/wishlist";
const ADD_WISHLIST = gql`
  mutation MyMutation($property_id: Int!, $user_id: Int!) {
    insert_wishlists_one(
      object: { property_id: $property_id, user_id: $user_id }
    ) {
      id
    }
  }
`;

export default function DetailProperties({ data }) {
  const { id } = useParams();
  const idLogin = parseInt(parseCookies("idLogin").idLogin);
  const [addWishlist, { data: dataAdd, loading: loadingAdd, error: errorAdd }] =
    useMutation(
      ADD_WISHLIST,
      {
        onError(error) {
          console.log(error);
        },
      }
      // { refetchQueries: [QUERY] }
    );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    if (errorAdd) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login first or property already in wishlist!",
      });
    }
  }, [errorAdd]);
  useEffect(() => {
    if (dataAdd !== undefined) {
      Swal.fire("Add property to wishlist success!", "", "success");
    }
  }, [dataAdd]);

  const filtered = data.filter((v) => {
    if (v.id === parseInt(id)) {
      return true;
    } else {
      return false;
    }
  });

  // if (loadingAdd) {
  //   return (
  //     <div
  //       style={{
  //         margin: "100px",
  //         // textAlign: "center",
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
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddWishlist = (idx) => {
    addWishlist({
      variables: {
        property_id: idx,
        user_id: idLogin,
      },
    });
    // Swal.fire(
    //   "Add wishlist success!",
    //   "You can see your property in wishlist!",
    //   "success"
    // );
  };

  return (
    <>
      {filtered.map((v) => {
        return (
          <div key={v.id}>
            <Container
              data-aos="zoom-in-up"
              fluid
              style={{
                backgroundColor: "#E0E0E0",
                height: "197px",
                textAlign: "center",
              }}
            >
              <div style={{ paddingTop: "60px" }}>
                <h2>{v.name.toUpperCase()}</h2>
                <h5>PROPERTIES / DETAIL PROPERTIES / {v.name.toUpperCase()}</h5>
              </div>
            </Container>
            <Container style={{ marginTop: "70px", marginBottom: "200px" }}>
              <Row className="justify-content-center">
                <Col lg={9}>
                  <Row>
                    <Col
                      lg={5}
                      style={{ textAlign: "left" }}
                      data-aos="zoom-in-up"
                    >
                      <img
                        src={v.img}
                        style={{ height: "340px", width: "324px" }}
                        alt="properties"
                      />
                    </Col>
                    <Col
                      lg={7}
                      style={{ marginTop: "20px" }}
                      data-aos="zoom-in-up"
                    >
                      {" "}
                      <h3>{formatRupiah(v.price)}</h3>
                      <br />
                      <hr />
                      <br />
                      <Button variant="dark" as={Link} to={`/chat?id=${v.id}`}>
                        <tag style={{ fontSize: "20px", margin: "39px" }}>
                          BUY
                        </tag>
                      </Button>
                      &nbsp;
                      <Button
                        variant="outline-dark"
                        onClick={() => handleAddWishlist(v.id)}
                      >
                        <tag style={{ fontSize: "20px" }}>
                          {loadingAdd ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <BsHeartFill />
                          )}
                          &nbsp; ADD WISHLIST
                        </tag>
                      </Button>
                      <br />
                      <br />
                      <hr />
                      <br />
                      <h5>Category: {v.category.name}</h5>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginLeft: "30px",
                      marginTop: "30px",
                      textAlign: "left",
                    }}
                  >
                    <h5 data-aos="zoom-in-up">Description</h5>
                    <p data-aos="zoom-in-up">{v.description}</p>
                  </Row>
                </Col>
                {/* <Col lg={3} style={{ border: "1px solid gray" }}>
                  <p style={{ marginTop: "10px" }} data-aos="zoom-in-left">
                    Related properties
                  </p>
                  {data.map((value) => {
                    if (value.category_id === v.category_id) {
                      return (
                        <>
                          <Row data-aos="zoom-in-left">
                            <Col lg={4}>
                              <img
                                alt="img properties"
                                src={value.img}
                                style={{ height: "98px", width: "98px" }}
                              />
                            </Col>
                            <Col lg={8}>
                              <div>
                                {value.name} <br /> {formatRupiah(value.price)}
                              </div>
                              <Link to={`/properties/${value.id}`}>
                                <Button
                                  variant="dark"
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "10px",
                                  }}
                                >
                                  Read more
                                </Button>{" "}
                              </Link>
                            </Col>
                          </Row>
                          <br />
                          <hr />
                        </>
                      );
                    }
                  })}
                </Col> */}
              </Row>
              <Container
                style={{ marginTop: "50px", paddingBottom: "50px" }}
                data-aos="zoom-in-up"
              >
                <h5>Related</h5>
                <Swiper
                  slidesPerView={5}
                  spaceBetween={0}
                  breakpoints={{
                    // when window width is >= 640px
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    // when window width is >= 480px
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    // when window width is >= 640px
                    640: {
                      slidesPerView: 5,
                      spaceBetween: 0,
                    },
                  }}
                  className="mySwiper"
                >
                  {data?.map((value) => {
                    if (
                      value.category_id === v.category_id &&
                      value.id !== parseInt(id)
                    ) {
                      return (
                        <SwiperSlide key={v.id}>
                          {" "}
                          <CardProperty1
                            idx={value.id}
                            name={value.name}
                            img={value.img}
                            price={value.price}
                          />
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
                <div style={{ textAlign: "center" }}>
                  <BsArrowLeft size={20} /> <BsArrowRight size={20} />{" "}
                </div>
              </Container>
            </Container>
          </div>
        );
      })}
    </>
  );
}
