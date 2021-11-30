/* eslint-disable array-callback-return */
import { Carousel, Container, Row, Col, Spinner } from "react-bootstrap";
import CardProperty1 from "../../components/card/Card";
import { gql, useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import AOS from "aos";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../stores/ListProperty";
import Error404 from "../../components/error/Error404";

const QUERY_PROPERTIES = gql`
  query MyQuery {
    properties {
      price
      name
      img
      id
      description
      category_id
      category {
        name
        id
      }
    }
  }
`;
function Home() {
  // const { data, loading, error } = useSubscription(SUBSCRIPTION_PROPERTY);
  const { data, loading, error } = useQuery(QUERY_PROPERTIES);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  } else {
    dispatch(addList(data?.properties));
  }
  if (error) {
    return <Error404 />;
  }
  return (
    <>
      <Carousel>
        <Carousel.Item interval={700}>
          <img
            data-testid="button"
            style={{ objectFit: "cover", WebkitFilter: "brightness(75%)" }}
            sizes="cover"
            height="643px"
            className="d-block w-100"
            src="/images/header.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: "bold" }}>Discover Design of</h1>
            <h1 style={{ fontWeight: "bold" }}>Modern Property</h1>
            <h4>Enjoying time in the city of your dreams.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            style={{ objectFit: "cover" }}
            height="643px"
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1581279813180-4dddc1008167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: "bold" }}>Discover Property in</h1>
            <h1 style={{ fontWeight: "bold" }}>your Dream City</h1>
            <h4>Modern property design is the art of modern era.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ objectFit: "cover", WebkitFilter: "brightness(75%)" }}
            height="643px"
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1590128217404-d8cd84da28af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: "bold" }}>Trending Properties Near</h1>
            <h1 style={{ fontWeight: "bold" }}>The Train Station</h1>
            <h4>Easily choose travel options.</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container
        style={{
          marginTop: "40px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          style={{ textAlign: "center" }}
        >
          <p style={{ fontWeight: "600" }}>
            FEATURED APARTEMENT
            <br />
            <tag style={{ fontWeight: "bold", fontSize: "30px" }}>
              MAYBE WHAT YOU LIKE
            </tag>
          </p>
        </div>
        <Row className="justify-content-center">
          {data?.properties.map((v) => {
            if (v.category_id === 2) {
              return (
                <Col
                  data-aos="zoom-in-up"
                  key={v.id}
                  md="auto"
                  xs={6}
                  sm={6}
                  lg={2}
                  style={{ marginTop: "20px" }}
                >
                  <CardProperty1
                    name={v.name}
                    price={v.price}
                    img={v.img}
                    idx={v.id}
                  />
                </Col>
              );
            }
          })}
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "#E0E0E0",
          paddingTop: "40px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{ textAlign: "center" }}
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
        >
          <p style={{ fontWeight: "600" }}>
            LATEST ARRIVALS
            <br />
            <tag style={{ fontWeight: "bold", fontSize: "30px" }}>
              MODERN DESAIN HOUSE PROPERTIES
            </tag>
          </p>
        </div>
        <Container
          style={{ marginTop: "50px", paddingBottom: "100px" }}
          data-aos="zoom-in-up"
        >
          <Swiper
            slidesPerView={5}
            spaceBetween={0}
            // centeredSlides={true}
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
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
          >
            {data?.properties.map((v) => {
              if (v.category_id === 1) {
                return (
                  <SwiperSlide key={v.id}>
                    {" "}
                    <CardProperty1
                      idx={v.id}
                      name={v.name}
                      img={v.img}
                      price={v.price}
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
          <div>
            {" "}
            <BsArrowLeft size={20} /> <BsArrowRight size={20} />{" "}
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Home;
