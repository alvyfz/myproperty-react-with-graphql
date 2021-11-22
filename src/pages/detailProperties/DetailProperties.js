/* eslint-disable array-callback-return */
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsHeartFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";

export default function DetailProperties({ data }) {
  const { id } = useParams();
  const filtered = data.filter((v) => {
    if (v.id === parseInt(id)) {
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
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      {
        /* {data
        .filter((v) => {
          if (v.id === id) {
            return true;
          } else {
            return false;
          }
        }) */
        filtered.map((v) => {
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
                  <h2>DETAIL PROPERTIES</h2>
                  <h5>
                    PROPERTIES / DETAIL PROPERTIES / {v.name.toUpperCase()}
                  </h5>
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
                        lg={6}
                        style={{ marginTop: "20px" }}
                        data-aos="zoom-in-up"
                      >
                        {" "}
                        <h3>{formatRupiah(v.price)}</h3>
                        <br />
                        <hr />
                        <br />
                        <Button variant="dark">
                          <tag style={{ fontSize: "20px", margin: "39px" }}>
                            BUY NOW
                          </tag>
                        </Button>
                        &nbsp;
                        <Button variant="outline-dark">
                          <tag style={{ fontSize: "20px" }}>
                            <BsHeartFill />
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
                  <Col lg={3} style={{ border: "1px solid gray" }}>
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
                                  {value.name} <br />{" "}
                                  {formatRupiah(value.price)}
                                </div>
                              </Col>
                            </Row>
                            <br />
                            <hr />
                          </>
                        );
                      }
                    })}
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })
      }
    </>
  );
}

// {
//   /* <Container
//         fluid
//         style={{
//           backgroundColor: "#E0E0E0",
//           height: "197px",
//           textAlign: "center",
//         }}
//       >
//         <div style={{ paddingTop: "60px" }}>
//           <h2>SEARCH</h2>
//           <h5>PROPERTIES / DETAIL PROPERTIES / {data.name.toUpperCase()}</h5>
//         </div>
//       </Container>
//       <Container style={{ marginTop: "70px", marginBottom: "200px" }}>
//         <Row className="justify-content-center">
//           <Col lg={9}>
//             <Row>
//               <Col lg={5} style={{ textAlign: "left" }}>
//                 <img
//                   src="https://images.unsplash.com/photo-1637525168710-cdc43ec46797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//                   style={{ height: "340px", width: "324px" }}
//                   alt="properties"
//                 />
//               </Col>
//               <Col lg={6} style={{ marginTop: "20px" }}>
//                 {" "}
//                 <h3>Rp. 1.999.999.999</h3>
//                 <br />
//                 <hr />
//                 <br />
//                 <Button variant="dark">
//                   <tag style={{ fontSize: "20px", margin: "39px" }}>
//                     BUY NOW
//                   </tag>
//                 </Button>
//                 &nbsp;
//                 <Button variant="outline-dark">
//                   <tag style={{ fontSize: "20px" }}>
//                     <BsHeartFill />
//                     &nbsp; ADD WISHLIST
//                   </tag>
//                 </Button>
//                 <br />
//                 <br />
//                 <hr />
//                 <br />
//                 <h5>Category: House</h5>
//               </Col>
//             </Row>
//             <Row
//               style={{
//                 marginLeft: "30px",
//                 marginTop: "30px",
//                 textAlign: "left",
//               }}
//             >
//               <h5>Description</h5>
//               <p>
//                 ajifgohaigfhioeahriv
//                 ahviahirjhfisahfiahfiahsifdhsssssssssssssssssssssssssssssssfhiwhfiewhfiiiiiiiiiiiiisifheifhiefheifheifheifhei
//               </p>
//             </Row>
//           </Col>
//           <Col lg={3} style={{ border: "1px solid gray" }}>
//             <p style={{ marginTop: "10px" }}>Related properties</p>
//             {}
//           </Col>
//         </Row>
//       </Container>  */
// }
