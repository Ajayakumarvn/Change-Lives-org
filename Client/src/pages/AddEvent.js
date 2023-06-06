import React, { Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BannerPoster from "../components/Banner-Poster";
import MenuList from "../components/MenuList";

const theme = createTheme();

const AddEvent = () => {
  const InitialForm = {
    title: "",
    venue: "",
    date: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    venue: Yup.string().required("Venue is required"),
    date: Yup.date().required("Date is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const res = await fetch("http://localhost:4000/changelives/events/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      // Show notification
      toast.success("Event added", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      resetForm(); // Reset the form to initial values
    }
  };

  return (
    <Fragment>
      {/* ... */}

      <div className="bg-wwlk ">
        <MenuList />
        <BannerPoster cap="Add Event" />
        <Box sx={{ padding: "60px 0" }}>
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
                  Add Event
                </Typography>
                <Formik
                  initialValues={InitialForm}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name"
                            name="title"
                            required
                            fullWidth
                            id="eventTitle"
                            label="Event Title"
                            autoFocus
                            onChange={handleChange}
                            value={values.title}
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="error"
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
                            onChange={handleChange}
                            value={values.venue}
                          />
                          <ErrorMessage
                            name="venue"
                            component="div"
                            className="error"
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
                            onChange={handleChange}
                            value={values.date}
                            InputLabelProps={{ shrink: true }}
                          />
                          <ErrorMessage
                            name="date"
                            component="div"
                            className="error"
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
                            onChange={handleChange}
                            value={values.description}
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="error"
                          />
                        </Grid>
                      </Grid>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    </Fragment>
  );
};

export default AddEvent;
