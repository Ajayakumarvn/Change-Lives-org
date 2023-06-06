import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BannerPoster from "../components/Banner-Poster";
import { Container } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import MenuList from "../components/MenuList";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  async function fetchVolunteers() {
    const res = await fetch(
      "http://localhost:4000/changelives/users/viewVolunteers",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.volunteers);
    setVolunteers(data.volunteers);
  }

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(
      `http://localhost:4000/changelives/users/delete/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    if (res.ok) {
      await fetchVolunteers();
      window.alert("Deleted Successfully");
    }
  }

  return (
    <Fragment>
      <div className="bg-wwlk">
        <MenuList />
        <BannerPoster cap="Volunteer Details" />
        <Container>
          <TableContainer component={Paper} style={{ margin: "50px 0" }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              style={{ border: "1px solid #333" }}
            >
              <TableHead
                style={{ background: "#333", color: "#fff!important" }}
              >
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteers.map((vol) => (
                  <TableRow
                    key={vol._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {vol.name}
                    </TableCell>
                    <TableCell align="center">{vol.email}</TableCell>
                    <TableCell align="center">
                      <AiFillDelete onClick={() => remove(vol._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </Fragment>
  );
}
