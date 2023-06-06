import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BannerPoster from "../components/Banner-Poster";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const [initialForm, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function handleInput(e) {
    setForm({ ...initialForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    sessionStorage.setItem("role", initialForm.role);
    console.log(initialForm);
    const res = await fetch("http://localhost:4000/changelives/users/signup", {
      method: "POST",
      body: JSON.stringify(initialForm),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(res.status);
    if (res.status === 200) {
      setForm({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
    const data = await res.json();
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("name", data.name);
    navigate("/home");
    console.log(data);
  };

  // const [role, setRole] = React.useState("");

  // const handleChange = (event) => {
  //   setRole(event.target.value);
  // };

  return (
    <React.Fragment>
   
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
              <Avatar sx={{ bgcolor: "black" }}>
                <AssignmentIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register Now
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Your Name"
                      autoFocus
                      onChange={handleInput}
                      value={initialForm.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleInput}
                      value={initialForm.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleInput}
                      value={initialForm.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        value={initialForm.role}
                        label="Role"
                        onChange={handleInput}
                      >
                        <MenuItem value={"Organizer"}>Organizer</MenuItem>
                        <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                        <MenuItem value={"Donor"}>Donor</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Box>
              <Grid container>
                <Grid item>
                  <Link to="/signin">Already Have An Account? Sign In</Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </React.Fragment>
  );
};

export default Register;
