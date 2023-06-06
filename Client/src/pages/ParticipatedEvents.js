import React, { Fragment, useEffect, useState } from "react";
import ev1 from "../assets/ev-1.jpg";
import { Col, Container, Row } from "react-bootstrap";
import BannerPoster from "../components/Banner-Poster";
import MenuList from "../components/MenuList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyEvents = () => {
  const [allevents, setAllEvents] = useState([]);

  const navigate = useNavigate();

  //Getting all the events
  useEffect(() => {
    fetchAllEvents();
  }, []);

  async function fetchAllEvents() {
    const res = await fetch(
      "http://localhost:4000/changelives/users/participated",

      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();

    setAllEvents(data.events);
    // console.log("allevents state:", allevents);
  }

  return (
    <Fragment>
      <div className="bg-wwlk">
        <MenuList />
        <BannerPoster cap="Events" />
        <Container className="event-lists" style={{ marginBottom: "50px" }}>
          <Row>
            {allevents.map((event) => (
              <Col xl="3" lg="4" md="6" key={event._id}>
                <div
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    margin: "20px 0",
                    padding: "20px",
                    background: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  <img src={ev1} alt="eventImage" />
                  <h4
                    style={{
                      textAlign: "center",
                      color: "grey",
                      marginTop: "10px",
                    }}
                  >
                    {event.title}
                  </h4>
                  <h6>
                    <span className="">Venue :</span> {event.venue}
                  </h6>
                  <h6>
                    <span>Date :</span> {event.date.slice(0, 10)}
                  </h6>
                  <h6>
                    <span>Description :</span> {event.description}
                  </h6>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default MyEvents;
