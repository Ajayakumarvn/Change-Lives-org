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

const Events = () => {
  const [allevents, setAllEvents] = useState([]);
  const [disabledEvents, setDisabledEvents] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  // Getting all the events
  useEffect(() => {
    fetchAllEvents();
  }, []);

  async function fetchAllEvents() {
    const res = await fetch(
      "http://localhost:4000/changelives/events/viewNon",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setAllEvents(data.npEvents);
    // console.log("allevents state:", allevents);
  }

  // Delete Button. Delete an event on click

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(
      `http://localhost:4000/changelives/events/delete/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    if (res.ok) {
      fetchAllEvents();
      // Show notification
      toast.success("Event Successfully Deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }

  async function participate(_id) {
    console.log(_id);
    const res = await fetch(
      `http://localhost:4000/changelives/users/participate/${_id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      // Show notification
      toast.success("Event Participation Successful", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      setIsButtonDisabled(true);
      setDisabledEvents([...disabledEvents, _id]);
    }
    // console.log("allevents state:", allevents);
  }

  // Edit Button. Re-Edit the events

  const eventId = "123"; // Replace with the actual ID of the event
  const editLink = `/edit-event/${eventId}`;

  async function editEvent(_id) {
    navigate(`/addevents/${_id}`);
  }

  return (
    <Fragment>
      <div className="bg-wwlk ">
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
                    borderRadius: "10px",
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
                  <h6>
                    <span>Created By:</span> {event.creator}
                  </h6>
                  {sessionStorage.getItem("role") === "Admin" ? (
                    <Link to={`/editevent/${event._id}`}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        style={{ marginRight: "20px" }}
                      >
                        <EditIcon />
                      </Button>
                    </Link>
                  ) : null}
                  {sessionStorage.getItem("role") === "Admin" ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => remove(event._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : null}
                  {sessionStorage.getItem("role") === "Admin" ||
                  sessionStorage.getItem("role") === "Organizer" ||
                  sessionStorage.getItem("role") === "Volunteer" ? null : (
                    <Link to="/donate">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={(e) => {
                          sessionStorage.setItem("event", event.title);
                        }}
                      >
                        Donate
                      </Button>
                    </Link>
                  )}
                  {sessionStorage.getItem("role") === "Volunteer" ? (
                    <Link to="/participatedevents">
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        style={{ marginRight: "20px" }}
                        disabled={disabledEvents.includes(event._id)}
                        onClick={() => {
                          participate(event._id);
                        }}
                      >
                        Participate
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Events;
