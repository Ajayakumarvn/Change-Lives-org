import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import BannerPoster from "../components/Banner-Poster";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const theme = createTheme();

const EditEvent = () => {
  const { id } = useParams();

  const [eventedit, setEventedit] = useState([]);

  useEffect(() => {
    fetchOldEvent();
  }, []);

  async function fetchOldEvent() {
    const res = await fetch(`http://localhost:4000/event/${id}`);
    const { dataedit } = await res.json();

    setEventedit(dataedit);
  }

  const InitialForm = {
    eventTitle: eventedit.eventTitle,
    venue: eventedit.venue,
    date: eventedit.date,
    time: eventedit.time,
    description: eventedit.description,
  };

  const clearForm = {
    eventTitle: "",
    venue: "",
    date: "",
    time: "",
    description: "",
  };

  function handleInput(e) {
    setEventedit({ ...InitialForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:4000/event/${id}`, {
      method: "PATCH",
      body: JSON.stringify(InitialForm),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      setEventedit(clearForm);
    }
  };

  return (
    <React.Fragment>
      <div className="bg-wwlk">
        <BannerPoster cap="Sign Up" />
        <Box sx={{ background: "#FAE5D3", padding: "60px 0" }}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "20px",
                  borderRadius: "10px",
                  background: "#fff",
                }}
              >
                <Avatar sx={{ bgcolor: "black" }}>
                  <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit Event
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="eventTitle"
                        required
                        fullWidth
                        id="eventTitle"
                        label="Event Title"
                        autoFocus
                        onChange={handleInput}
                        value={InitialForm.eventTitle}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="venue"
                        required
                        fullWidth
                        id="venue"
                        label="Venue"
                        autoFocus
                        onChange={handleInput}
                        value={InitialForm.venue}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="date"
                        required
                        fullWidth
                        id="date"
                        label="Date"
                        type="date"
                        autoFocus
                        onChange={handleInput}
                        value={InitialForm.date}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="time"
                        type="time"
                        required
                        fullWidth
                        id="time"
                        label="time"
                        autoFocus
                        onChange={handleInput}
                        value={InitialForm.time}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        name="description"
                        minRows={3}
                        id="description"
                        label="Description"
                        autoComplete="email"
                        onChange={handleInput}
                        value={InitialForm.description}
                      />
                    </Grid>

                    {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Remember Me"
                    />
                  </Grid> */}
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default EditEvent;
