/* eslint-disable array-callback-return */
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CardProperty1 from "../../components/card/Card";
import AOS from "aos";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { addList } from "../../stores/ListProperty";
import Error404 from "../../components/error/Error404";

const QUERY = gql`
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

const Apartement = () => {
  const { data, loading, error } = useQuery(QUERY);
  const listProps = data?.properties;
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
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
    dispatch(addList(data.properties));
  }
  if (error) {
    return <Error404 />;
  }
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
          <h2>APARTEMENT</h2>
          <h5>CATEGORIES / APARTEMENT</h5>
        </div>
      </Container>
      <Container
        style={{
          marginTop: "40px",
          marginBottom: "320px",
          textAlign: "center",
        }}
      >
        <Row className="justify-content-center">
          {listProps?.map((v) => {
            if (v.category.id === 2) {
              return (
                <Col
                  key={v.id}
                  md="auto"
                  xs="auto"
                  sm="auto"
                  lg={2}
                  style={{ marginTop: "20px" }}
                >
                  <CardProperty1
                    name={v.name}
                    price={v.price}
                    img={v.img}
                    category={v.category.name}
                    idx={v.id}
                    data-aos="zoom-in-up"
                  />
                </Col>
              );
            }
          })}
        </Row>
      </Container>
    </>
  );
};

export default Apartement;
