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
import MenuList from "../components/MenuList";

export default function Transactions() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/changelives/donation/view", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });
    const data = await res.json();

    setDonations(data.viewDonation);
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
                  <TableCell align="left">Transaction ID</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Card Holder</TableCell>
                  <TableCell align="center">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((don) => (
                  <TableRow
                    key={don._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{don._id}</TableCell>
                    <TableCell>{don.eventName}</TableCell>
                    <TableCell component="th" scope="row">
                      {don.accountHolderName}
                    </TableCell>
                    <TableCell align="center">{don.amount}</TableCell>
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
