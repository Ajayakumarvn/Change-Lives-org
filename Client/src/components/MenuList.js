import { Container } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.webp";

function MenuList() {
  const logoutHandler = () => {
    sessionStorage.clear();

    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("role");
    // sessionStorage.removeItem("name");
    // sessionStorage.removeItem("event");
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        opacity: "1",
        position: "fixed",
        width: "100%",
        zIndex: 9999,
      }}
    >
      <Container
        className="p-3 d-flex justify-content-between align-items"
        style={{ backgroundColor: "transparent," }}
      >
        <div className="logo">
          <Link to="/home">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <nav className="menu">
          {sessionStorage.getItem("role") === "Admin" ||
          sessionStorage.getItem("role") === "Organizer" ? (
            <Link className="menu-list" to="/addevents">
              Add Event
            </Link>
          ) : (
            " "
          )}

          <Link className="menu-list" to="/events">
            Events
          </Link>

          {sessionStorage.getItem("role") === "Organizer" ? (
            <Link className="menu-list" to="/myevents">
              My Events
            </Link>
          ) : (
            " "
          )}
          {sessionStorage.getItem("role") === "Volunteer" ? (
            <Link className="menu-list" to="/participatedevents">
              My Events
            </Link>
          ) : (
            " "
          )}
          {sessionStorage.getItem("role") === "Admin" ? (
            <Link className="menu-list" to="/donor-list">
              Donor List
            </Link>
          ) : (
            ""
          )}

          {sessionStorage.getItem("role") === "Admin" ||
          sessionStorage.getItem("role") === "Organizer" ? (
            <Link className="menu-list" to="/volunteer-list">
              Volunteer List
            </Link>
          ) : (
            " "
          )}

          {sessionStorage.getItem("role") === "Admin" ? (
            <Link className="menu-list" to="/organizer-list">
              Organizer List
            </Link>
          ) : (
            " "
          )}

          {sessionStorage.getItem("role") === "Admin" ? (
            <Link className="menu-list" to="/transactions">
              Transaction List
            </Link>
          ) : (
            " "
          )}
        </nav>

        <div className="log-avatar d-flex justify-content-between align-items-center">
          <Button
            variant="warning"
            style={{ marginRight: "10px", color: "#fff" }}
          >
            {" "}
            {sessionStorage.getItem("name")}
          </Button>
          <Link to="/">
            <Button variant="danger" onClick={logoutHandler}>
              Logout
            </Button>{" "}
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default MenuList;
