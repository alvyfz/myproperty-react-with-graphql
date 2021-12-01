/* eslint-disable array-callback-return */
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CardProperty1 from "../../components/card/Card";
import AOS from "aos";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { addList } from "../../stores/ListProperty";
import Error404 from "../../components/error/Error404";

export const QUERY = gql`
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

const Properties = () => {
  const { data, loading, error } = useQuery(QUERY);
  const listProps = data?.properties;
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
        <div style={{ paddingTop: "60px" }} data-testid="title">
          <h2>PROPERTIES</h2>
          <h5>PROPERTIES PRODUCT</h5>
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
            return (
              <Col
                key={v.id}
                md="auto"
                xs={6}
                sm={6}
                lg={2}
                style={{ marginTop: "20px" }}
                data-testid="card"
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
          })}
        </Row>
      </Container>
    </>
  );
};

export default Properties;
