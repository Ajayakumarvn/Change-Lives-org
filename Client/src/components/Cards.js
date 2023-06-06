import React from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";

const Cards = ({
  title,
  venue,
  date,
  description,
  // eventCreatedBy,
  cardimg,
}) => {
  return (
    <div>
      <Card style={{ border: "none", padding: "20px" }}>
        <Card.Img
          variant="top"
          src={cardimg}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            objectPosition: "50% 100%",
          }}
        />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text
            style={{
              textAlign: "justify",
              fontSize: "14px",
            }}
          >
            {venue}
          </Card.Text>
          <p>
            <b>Venue: </b>
            {venue}
          </p>
          <p>
            <b>Description: </b>
            {description}
          </p>
          <p>
            <b>Date: </b>
            {date}
          </p>

          {/* {eventCreatedBy == "" ? (
            <p></p>
          ) : (
            <p>
              <b>Created By: </b>
              {eventCreatedBy}
            </p>
          )} */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
