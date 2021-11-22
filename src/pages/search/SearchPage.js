/* eslint-disable array-callback-return */
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CardProperty1 from "../../components/card/Card";
import AOS from "aos";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { addList } from "../../stores/ListProperty";

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

const Search = () => {
  const { data, loading, error } = useQuery(QUERY);
  const listProps = data?.properties;
  const search = useSelector((s) => s.search.search);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const filtered = listProps?.filter((v) => {
    if (
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  });
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
    return error;
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
          <h2>SEARCH</h2>
          <h5>SEARCH / PROPERTIES / {search.toUpperCase()}</h5>
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
          {filtered?.length > 0 ? (
            filtered?.map((v) => {
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
            })
          ) : (
            <Container style={{ margin: "100px" }} data-aos="zoom-in-up">
              <h1>OPPS</h1>
              <h2>Name or category property not found</h2>
              <h3>
                {" "}
                Go home ? <Button variant="dark">Home</Button>
              </h3>
            </Container>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Search;
