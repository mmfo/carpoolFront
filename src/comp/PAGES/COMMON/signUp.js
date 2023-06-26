import * as React from "react";
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
import Users from "../../SERVICES/UserService";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
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

export default function SignUp() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = React.useState({
    UserName: "",
    UserEmail: "",
    UserPassword: "",
    UserPhone: "",
  });
  const [errors, setErrors] = React.useState({
    UserName: "",
    UserEmail: "",
    UserPassword: "",
    UserPhone: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "UserName":
        if (!value || value.trim() === "") {
          return "First Name";
        } else {
          return "";
        }
      case "UserPhone":
        if (!value || value.trim() === "") {
          return "Phone Number";
        } else if (!value.match(/^[0-9]\d{9}$/)) {
          return "Invalid Phone Number";
        } else {
          return "";
        }
      case "UserEmail":
        if (!value) {
          return "Email";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Invalid Email";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    //   var res1 = await Users.isEmailExist(userObj.UserEmail)
    //  if (res.ok)//if the email exist
    // {
    //   alert(' email already in the bd , go to log in ')
    //   navigate('/login')
    // }
    if (userObj.UserName && userObj.UserEmail && userObj.UserPassword) {
      const data = {
        UserName: userObj.UserName,
        UserEmail: userObj.UserEmail,
        UserPassword: userObj.UserPassword,
      };
      console.log("----data----", data);
      var res = await Users.createUser(userObj);
      window.alert("נשלח בהצלחה!", JSON.stringify(data));
      if (res !== null)
        //??
        navigate("/");
    }
  };
  const onChange = (selected, key) => {
    setErrors({ ...errors, [key]: validate(key, selected) });
    setUserObj((prev) => ({ ...prev, [key]: selected }));
  };
  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "#09195c" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography color="#09195c" component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1.5, width: "95%" },
              margin: "0 auto",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <Box style={{ width: "400px" }} container spacing={2}>
              <Box item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="name"
                  label="Name"
                  autoComplete="name"
                  onChange={(e) => {
                    onChange(e.target.value, "UserName");
                  }}
                />
                {errors.UserName && (
                  <Alert severity="error">{errors.UserName} </Alert>
                )}
              </Box>
              <Box item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  id="number"
                  label="Phone Number"
                  name="number"
                  autoComplete="number"
                  onChange={(e) => {
                    onChange(e.target.value, "UserPhone");
                  }}
                />
                {errors.UserPhone && (
                  <Alert severity="error">{errors.UserPhone} </Alert>
                )}
              </Box>
              <Box item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
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
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Box>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1.5,
                mb: 2,
              }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Box container>
              <Box item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Log in
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
