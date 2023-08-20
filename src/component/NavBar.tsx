import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import home from "../assets/home.png";
import { useLocation, Link } from "react-router-dom";

interface NavBarProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const loc = useLocation();

  return (
    <Navbar fixed="top" expanded={false} className="bg-body-tertiary">
      <Container fluid>
        {!loc.pathname.includes("details") ? (
          <Form className="d-flex box ">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ width: "500px" }}
              onChange={onSearch}
            />
          </Form>
        ) : (
          "Movie Details"
        )}
        <Navbar.Brand as={Link} to="/">
          <img src={home} style={{ width: "20px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
