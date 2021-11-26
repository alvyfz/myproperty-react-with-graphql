/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Container, Spinner, Button, Col, Row } from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";
import Error404 from "../../components/error/ErrorNotFound";
import { Link } from "react-router-dom";
import { parseCookies } from "nookies";

const QUERY = gql`
  query MyQuery {
    wishlists {
      id
      property_id
      property {
        description
        id
        name
        img
        price
      }
      user {
        id
      }
      user_id
    }
  }
`;
// const QUERY_LAZY = gql`
//   query MyQuery($id_user: Int!) {
//     wishlists(where: { user_id: { _eq: $id_user } }) {
//       id
//       property {
//         id
//         img
//         name
//         price
//       }
//       property_id
//       user_id
//     }
//   }
// `;

const DELETE = gql`
  mutation MyMutation($id: Int!) {
    delete_wishlists_by_pk(id: $id) {
      id
    }
  }
`;

function Wishlist() {
  // window.location.reload(false);
  const { data, loading, error } = useQuery(QUERY);
  // const [getData, { data, loading }] = useLazyQuery(QUERY_LAZY);

  const [deleteWishlist, { loading: loadingDelete, errorDel }] = useMutation(
    DELETE,
    {
      refetchQueries: [QUERY],
    }
  );

  const navigate = useNavigate();
  const id = parseInt(parseCookies("idLogin").idLogin);
  console.log(data);
  const wishlist = data?.wishlists;

  // useEffect(() => {
  //   getData({
  //     variables: {
  //       id_user: id,
  //     },
  //   });
  // }, [() => onDelete]);
  useEffect(() => {
    if (id === undefined || isNaN(id)) {
      navigate("/login");
    }
  }, []);
  if (loading || loadingDelete) {
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

  if (errorDel || error) {
    return <Error404 />;
  }
  const filtered = wishlist?.filter((v) => {
    if (v?.user_id === id) {
      return true;
    } else {
      return false;
    }
  });
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  const onDelete = (idx) => {
    deleteWishlist({ variables: { id: idx } });
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
          <h2>WISHLIST</h2>
          <h5>ACCOUNT / WISHLIST</h5>
        </div>
      </Container>
      <Container
        style={{
          marginTop: "40px",
          marginBottom: "320px",
          textAlign: "center",
        }}
      >
        <Row>
          {filtered?.length > 0 ? (
            filtered?.map((v) => {
              return (
                <Col
                  key={v.property.id}
                  md="auto"
                  xs="auto"
                  sm="auto"
                  lg={9}
                  style={{ marginTop: "20px", textAlign: "left" }}
                >
                  <Row>
                    <Col lg={3}>
                      <img
                        alt="img properties"
                        src={v.property.img}
                        style={{
                          height: "180px",
                          width: "200px",
                        }}
                      />
                    </Col>
                    <Col lg={8} style={{ textAlign: "left" }}>
                      <div>
                        <h4> {v.property.name} </h4>{" "}
                        <h5> {formatRupiah(v.property.price)}</h5>
                      </div>
                      <Link to={`/properties/${v.property.id}`}>
                        <Button
                          variant="dark"
                          style={{
                            marginTop: "50px",
                            fontSize: "16px",
                          }}
                        >
                          Read more
                        </Button>
                      </Link>
                      <Button
                        onClick={() => onDelete(v.id)}
                        variant="outline-dark"
                        style={{
                          marginTop: "50px",
                          marginLeft: "10px",
                          fontSize: "16px",
                        }}
                      >
                        Delete wishlist
                      </Button>{" "}
                    </Col>
                  </Row>
                  <hr />
                </Col>
              );
            })
          ) : (
            <Container
              style={{ textAlign: "center", marginTop: "50px" }}
              data-aos="zoom-in-up"
            >
              <h1>OPPS</h1>
              <h2>You don't have a wishlist.</h2>
              <h3>
                {" "}
                Go home ?{" "}
                <Button as={Link} to="/" variant="dark">
                  Home
                </Button>
              </h3>
            </Container>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Wishlist;
