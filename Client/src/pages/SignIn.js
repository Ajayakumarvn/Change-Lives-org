import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import BannerPoster from "../components/Banner-Poster";
import { useNavigate } from "react-router-dom";
import MenuList from "../components/MenuList";

const theme = createTheme();

const Contact = () => {
  const navigate = useNavigate();

  const InitialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(InitialForm);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function dashboard(uname, id) {
    sessionStorage.setItem("username", uname);
    sessionStorage.setItem("uid", id);
    console.log(uname);
    // navigate("/");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:4000/changelives/users/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      setForm({
        email: "",
        password: "",
      });
      const data = await res.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("name", data.name);
      navigate("/home");
    }

    // if (res.ok) {
    //   const { role, username, id } = await res.json();
    //   if (role === "Admin") {
    //     console.log(role);
    //     setForm(InitialForm);
    //     dashboard(username, id);
    //   } else if (role === "Volunteer") {
    //     console.log(role);
    //     setForm(InitialForm);
    //     dashboard(username, id);
    //   } else if (role === "Organizer") {
    //     console.log(role);
    //     setForm(InitialForm);
    //     dashboard(username, id);
    //   } else if (role === "Donor") {
    //     console.log(role);
    //     setForm(InitialForm);
    //     dashboard(username, id);
    //   }
    // } else {
    //   console.log("error");
    //   window.alert("UnAuthorised");
    // }
  };

  return (
    <Fragment>
      <Box sx={{ background: "#fff", padding: "60px 0",minHeight:"100vh",background: "#0F2027", background: "-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)", background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",  }}>
      <h1 style={{color:"#fff",fontSize:"3em",textAlign:"center",marginBottom:"50px"}}>CHANGELIVESEORG</h1>  
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleInput}
                  autoComplete="email"
                  autoFocus
                  value={form.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleInput}
                  id="password"
                  autoComplete="current-password"
                  value={form.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Fragment>
  );
};

export default Contact;
