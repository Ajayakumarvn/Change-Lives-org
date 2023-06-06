import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../components/Banner";
import MenuList from "../components/MenuList";
import About from "../assets/images/about.png";

const Home = () => {
  return (
    <Fragment>
      <MenuList />
      <Banner />

      <Container fluid style={{ background: "#fff", padding: "60px 0" }}>
        <Container>
          <Row>
            <Col>
              <img src={About} alt="about" />
            </Col>
            <Col className="register-donor">
              <h5>Make Donation</h5>
              <span>Become a Donar</span>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Home;
