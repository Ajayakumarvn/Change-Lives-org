import React, { Fragment, useEffect, useState } from "react";
import MenuList from "../components/MenuList";
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

export default function OrganiserList() {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  async function fetchOrganizers() {
    const res = await fetch(
      "http://localhost:4000/changelives/users/viewOrganizers",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();

    setOrganizers(data.organizers);
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
      fetchOrganizers();
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
              striped
              bordered
              hover
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              style={{ border: "1px solid #333" }}
            >
              <TableHead
                style={{ background: "#333", color: "#fff!important" }}
              >
                <TableRow>
                  <TableCell style={{ color: "#fff!important" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ color: "#fff!important" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" style={{ color: "#fff!important" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizers.map((org) => (
                  <TableRow
                    key={org._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {org.name}
                    </TableCell>
                    <TableCell align="center">{org.email}</TableCell>
                    <TableCell align="center">
                      <AiFillDelete onClick={() => remove(org._id)} />
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
