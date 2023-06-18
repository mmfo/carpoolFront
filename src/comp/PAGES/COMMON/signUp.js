import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import Users from '../../SERVICES/UserService';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const [userObj, setUserObj] = React.useState({
    UserName: "",
    UserEmail: "",
    UserPassword: "",
    UserPhone:""
  });
  const [errors, setErrors] = React.useState({
    UserName: "",
    UserEmail: "",
    UserPassword: "",
    UserPhone:""
  });

  const validate = (name, value) => {
  
  switch (name) {
    case "UserName":
      if (!value || value.trim() === "") {
        return "❗שם פרטי הוא שדה חובה ";
      } else {
        return "";
      }
    case "UserPhone":
      if (!value || value.trim() === "") {
        return "❗מספר הטלפון הוא שדה חובה ";
      } else if (!value.match(/^[0-9]\d{9}$/)) {
        return "הכנס מספר טלפון תקין";
      } else {
        return "";
      }
    case "UserEmail":
      if (!value) {
        return "❗מייל הוא שדה חובה ";
      } else if (
        !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        return "הזן כתובת מייל חוקית";
      } else {
        return "";
      }
    case "UserPassword":
      if (!value) {
        return "❗סיסמא היא שדה חובה ";
      } else if (value.length < 8 || value.length > 15) {
        return "הזן בבקשה שמונה תווים בלבד";
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
  Object.keys(userObj).forEach(name => {
    const error = validate(name, userObj[name]);
    if (error && error.length > 0) {
      validationErrors[name] = error;
    }
  });
  if (Object.keys(validationErrors).length > 0) {
    // this.setState({ errors: validationErrors });
    setErrors(validationErrors)
    return;
  }
  debugger
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
    window.alert("נשלח בהצלחה!", JSON.stringify(data));
    console.log("----data----", data);
    var res = await Users.createUser(userObj)

    if (res.ok)//??
      navigate('/')
  }
}
const onChange = (selected, key) => {
  setErrors({ ...errors, [key]: validate(key, selected) })
  setUserObj((prev) => ({ ...prev, [key]: selected }))
}
return (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
          </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                onChange={(e) => { onChange(e.target.value, "UserName") }}
              />
              <span style={{ color: 'red' }} className="text-danger">{errors.UserName}</span>

            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => { onChange(e.target.value, "UserEmail") }}
              />
              <span style={{ color: 'red' }} className="text-danger">{errors.UserEmail}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="number"
                label="Phone Number"
                name="number"
                autoComplete="number"
                onChange={(e) => { onChange(e.target.value, "UserPhone") }}
              />
              <span style={{ color: 'red' }} className="text-danger">{errors.UserPhone}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => { onChange(e.target.value, "UserPassword") }}
              />
              <span style={{ color: 'red' }} className="text-danger">{errors.UserPassword}</span>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
            </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate("/login")}>
                Already have an account? Log in
                </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </ThemeProvider>
);
}

