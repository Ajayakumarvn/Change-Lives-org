import React, { Fragment } from "react";
import BannerPoster from "../components/Banner-Poster";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  async function fetchVolunteers() {
    const res = await fetch("http://localhost:4000/signup");
    const { data } = await res.json();
    setVolunteers(data);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Fragment>
      <div className="bg-wwlk">
        <BannerPoster cap="Volunteer Details" />
        <Container fluid style={{ background: "#2f4158" }}>
          <Container style={{ padding: "60px 0" }}>
            <div
              style={{
                height: 400,
                width: "50%",
                margin: "auto",
                color: "#fff",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                style={{ color: "#fff" }}
              />
            </div>
          </Container>
        </Container>
      </div>
    </Fragment>
  );
};

export default VolunteerList;
