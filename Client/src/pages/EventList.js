import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "eventName", headerName: "Event Name", width: 130 },
  { field: "date", headerName: "Last name", width: 130 },
  {
    field: "location",
    headerName: "Location",
    width: 130,
  },
];

const rows = [
  { id: 1, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 2, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 3, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 4, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 5, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 6, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 7, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 8, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 9, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 10, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 11, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 12, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 13, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
  { id: 14, eventName: "Snow", date: "05-01-2023", location: "Naveda" },
];

const EventList = () => {
  return (
    <Container>
      <div style={{ height: 400, width: "70%", margin: "60px auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default EventList;
