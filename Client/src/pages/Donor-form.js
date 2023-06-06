import * as React from "react";
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
import BannerPoster from "../components/Banner-Poster";
import { useState } from "react";
import MenuList from "../components/MenuList";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const theme = createTheme();

const Donorform = () => {
  const validationSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    accountHolderName: Yup.string().required("Card Holder Name is required"),
    cardNumber: Yup.string()
      .required("Card Number is required")
      .matches(/^\d{16}$/, "Card Number must be a 16-digit number"),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be a 3-digit number"),
    expDate: Yup.string().required("Expiry Date is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch(
      "http://localhost:4000/changelives/donation/donate",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );

    if (res.ok) {
      // Show notification
      toast.success("Payment successFull", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      sessionStorage.removeItem("event");
      resetForm(); // Reset the form to initial values
    }
  };

  return (
    <React.Fragment>
      <div className="bg-wwlk ">
        <MenuList />
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

                <Formik
                  initialValues={{
                    eventName: sessionStorage.getItem("event"),
                    amount: "",
                    accountHolderName: "",
                    cardNumber: "",
                    cvv: "",
                    expDate: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, errors, touched }) => (
                    <Form noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <Typography
                            component="h1"
                            variant="h5"
                            style={{ textAlign: "center" }}
                          >
                            Card Details
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <TextField
                            autoComplete="given-name"
                            name="amount"
                            type="number"
                            required
                            fullWidth
                            id="amount"
                            label="Amount"
                            autoFocus
                            value={values.amount}
                            onChange={handleChange}
                            error={touched.amount && errors.amount}
                            helperText={touched.amount && errors.amount}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <TextField
                            autoComplete="given-name"
                            name="accountHolderName"
                            required
                            fullWidth
                            id="accountHolderName"
                            label="Card Holder Name"
                            autoFocus
                            value={values.accountHolderName}
                            onChange={handleChange}
                            error={
                              touched.accountHolderName &&
                              errors.accountHolderName
                            }
                            helperText={
                              touched.accountHolderName &&
                              errors.accountHolderName
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <TextField
                            autoComplete="given-name"
                            name="cardNumber"
                            type="number"
                            required
                            fullWidth
                            id="cardNumber"
                            label="Card Number"
                            onInput={(e) => {
                              e.target.value = e.target.value.slice(0, 16);
                            }}
                            autoFocus
                            value={values.cardNumber}
                            onChange={handleChange}
                            error={touched.cardNumber && errors.cardNumber}
                            helperText={touched.cardNumber && errors.cardNumber}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="cvv"
                            type="number"
                            required
                            id="cvv"
                            label="CVV"
                            onInput={(e) => {
                              e.target.value = e.target.value.slice(0, 3);
                            }}
                            autoFocus
                            value={values.cvv}
                            onChange={handleChange}
                            error={touched.cvv && errors.cvv}
                            helperText={touched.cvv && errors.cvv}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="expDate"
                            type="date"
                            required
                            id="expDate"
                            label="Expiry Date"
                            autoFocus
                            value={values.expDate}
                            onChange={handleChange}
                            error={touched.expDate && errors.expDate}
                            helperText={touched.expDate && errors.expDate}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Pay
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default Donorform;
