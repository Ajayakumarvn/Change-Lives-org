import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import ev1 from "../assets/images/ev-1.jpg";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Register from "./Register";
// import RegisterBtn from "../components/RegisterBtn";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Events = () => {
  const uid = sessionStorage.getItem("uid");
  const username = sessionStorage.getItem("username");

  const navigate = useNavigate();
  const [allevents, setAllEvents] = useState([]);
  const [myevents, setMyEvents] = useState([]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  async function fetchAllEvents() {
    const res = await fetch("http://localhost:4000/changelives/events/view");
    const allEvents = await res.json();
    setAllEvents(allEvents);
  }

  async function fetchMyEvents() {
    const res = await fetch(`http://localhost:4000/event/myevents/${uid}`);
    const { myeventdata } = await res.json();
    setMyEvents(myeventdata);
  }

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:4000/event/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchAllEvents();
      fetchMyEvents();
      window.alert("Deleted Successfully");
    }
  }

  async function editEvent(_id) {
    navigate(`/editevent/${_id}`);
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All Events" {...a11yProps(0)} />
            <Tab label="My Events" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Container className="event-lists">
            <Row>
              <h2 className="heading-2">
                Lets Join our Hand to help those in need
              </h2>
            </Row>

            <Row>
              {allevents.map((eve) => (
                <Col xl="3" lg="4" md="6" key={eve._id}>
                  <div style={{ border: "1px solid red" }}>
                    <Cards
                      cardimg={ev1}
                      eventTitle={eve.title}
                      eventVenue={eve.venue}
                      eventDate={eve.date}
                      eventDescription={eve.description}
                      // eventCreatedBy={
                      //   eve.createdBy == username
                      //     ? (eve.createdBy = "Me")
                      //     : (eve.createdBy = eve.createdBy)
                      // }
                    ></Cards>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <AiFillEdit
                        style={{
                          fontSize: "24px",
                          color: "#25b0dd",
                          marginTop: "2px",
                        }}
                        className=" mx-2"
                        passid={eve._id}
                        onClick={() => editEvent(eve._id)}
                      />

                      <MdDelete
                        style={{ fontSize: "26px", color: "red" }}
                        className="mx-2"
                        onClick={() => remove(eve._id)}
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Container className="event-lists">
            <Row>
              <h2 className="heading-2">Lets Join our Hand</h2>
            </Row>

            <Row>
              {myevents.map((eve) => (
                <Col xl="3" lg="4" md="6" key={eve._id}>
                  <div style={{ border: "1px solid red" }}>
                    <Cards
                      cardimg={ev1}
                      eventTitle={eve.title}
                      eventVenue={eve.venue}
                      eventDate={eve.date}
                      eventDescription={eve.description}
                      // eventCreatedBy=""
                    ></Cards>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <AiFillEdit
                        style={{
                          fontSize: "24px",
                          color: "#25b0dd",
                          marginTop: "2px",
                        }}
                        className=" mx-2"
                        passid={eve._id}
                        onClick={() => editEvent(eve._id)}
                      />

                      <MdDelete
                        style={{ fontSize: "26px", color: "red" }}
                        className="mx-2"
                        onClick={() => remove(eve._id)}
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </TabPanel>
      </Box>
    </>
  );
};

export default Events;
