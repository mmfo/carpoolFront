import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const httpUser = "https://localhost:7293/api/User";

export default function Login() {
  const navigate = useNavigate();
  const dataState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState({
    UserEmail: "",
    UserPassword: "",
  });
  const [errors, setErrors] = useState({
    UserEmail: "",
    UserPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (name, value) => {
    switch (name) {
      case "UserName":
        if (!value || value.trim() === "") {
          return "First Name";
        } else {
          return "";
        }
      case "UserEmail":
        if (!value) {
          return "Email";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "UserPassword":
        if (!value) {
          return "Password";
        } else if (value.length < 8 || value.length > 15) {
          return "Please enter 8 characters only";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };
  const onChange = (selected, key) => {
    setErrors({ ...errors, [key]: validate(key, selected) });
    setUserObj((prev) => ({ ...prev, [key]: selected }));
  };
  const handleSubmit = async () => {
    let validationErrors = {};
    Object.keys(userObj).forEach((name) => {
      const error = validate(name, userObj[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (userObj.UserPassword && userObj.UserEmail) {
      var res = await fetch(//fetch all user's details
        `${httpUser}/${userObj.UserEmail}/${userObj.UserPassword}`
      );
      console.log("res", res);
      if (res.ok) {
        var data = await res.json();
        if (data.id === 0) {
         setErrorMessage("You are not registered in the system");
          // setTimeout(() => {
          //   setErrorMessage(" ");
          // }, 3000);
          // alert("אינך רשום במערכת");
         // navigate("/signup");
        } else {
          console.log(data);
          dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
          navigate("/");
        }
      } else {
        window.alert("error in login c#");
      }
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1,
            //  bgcolor: "#09195c" 
             }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1" variant="h5">
            Log in
          </Typography>
          {errorMessage && (
            <Alert sx={{ mt: "5px" }} severity="error">
              {errorMessage}
            </Alert>
          )}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1.5, width: "95%" },
              margin: "0 auto",
              maxWidth: "400px",
              textAlign: "center",
              //  padding: "10px",
            }}
          >
            <Box style={{ width: "400px" }} container spacing={2}>
              <Box item xs={12}>
                <TextField
                  // margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  // name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    onChange(e.target.value, "UserEmail");
                  }}
                />

                {errors.UserEmail && (
                  <Alert severity="error">{errors.UserEmail} </Alert>
                )}
              </Box>
              <Box item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    onChange(e.target.value, "UserPassword");
                  }}
                />
                {errors.UserPassword && (
                  <Alert severity="error">{errors.UserPassword} </Alert>
                )}
              </Box>
              <Box
                item
                xs={12}
                style={{
                  margin: "5px",
                }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember"  />}//color="primary"
                  label="Remember me"
                />
              </Box>
              <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Button fullWidth variant="contained" onClick={handleSubmit}
                //  style={{backgroundColor:"#09195c"}}
                 >
                  Log In
                </Button>
              </Box>
              <Box style={{ display: "flex", justifyContent: "space-around" }}>
                <Box>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                <Box>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => navigate("/signup")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
