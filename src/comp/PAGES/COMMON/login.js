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
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

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
const httpUser = 'https://localhost:7293/api/User';

export default function Login() {
    const navigate = useNavigate()
    const dataState = useSelector(state => state)
    const dispatch = useDispatch()
    const [userObj, setUserObj] = React.useState({
        UserEmail: "",
        UserPassword: "",
    });
    const [errors, setErrors] = React.useState({
        UserEmail: "",
        UserPassword: "",
    });

    const validate = (name, value) => {
        switch (name) {
            case "UserName":
                if (!value || value.trim() === "") {
                    return "❗שם פרטי הוא שדה חובה ";
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
    const onChange = (selected, key) => {
        setErrors({ ...errors, [key]: validate(key, selected) })
        setUserObj((prev) => ({ ...prev, [key]: selected }))
    }
    const handleSubmit = async () => {
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
        if (userObj.UserPassword && userObj.UserEmail) {
            var res = await fetch(`${httpUser}/${userObj.UserEmail}/${userObj.UserPassword}`);
            console.log("res", res)
            if (res.ok) {
                var data = await res.json()
                if (data.id === 0) {
                    alert("אינך רשום במערכת")
                    navigate('/signup')
                } else {
                    console.log(data)
                    dispatch({ type: 'UPDATE_CURRENT_USER', payload: data })
                    navigate('/')
                }
            }
            else {
                window.alert("error in login c#");
            }
        }
    };

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
                        Log in
          </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => { onChange(e.target.value, "UserEmail") }}
                        />
                        <span style={{ color: 'red' }} className="text-danger">{errors.UserEmail}</span>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => { onChange(e.target.value, "UserPassword") }}
                        />
                        <span style={{ color: 'red' }} className="text-danger">{errors.UserPassword}</span>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Log In
            </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={()=>navigate('/signup')}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
