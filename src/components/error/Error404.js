import { FaRegSadTear } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Error404() {
  return (
    <>
      {" "}
      <div style={{ textAlign: "center", margin: "150px" }}>
        <FaRegSadTear size={200} />
        <br /> <br />
        <h1>ERROR 404</h1>
        <br /> <br />
        <Button variant="outline-dark" as={Link} to="/">
          Go home
        </Button>
      </div>
    </>
  );
}
