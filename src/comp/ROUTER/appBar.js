import React, { useState } from "react";
// import { makeStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Divider, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, Container, Box, MenuItem, Tooltip, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));
const SpanDesign = styled("span")({
  fontsize: "1.5rem",
  marginRight: "10px",
  textDecoration: "none",
  color: "white",
  paddingLeft: "5px",
  alignSelf: "center",
  display: "inline-block",
});
const SpanDesign2 = styled("span")({
  fontsize: "1.5rem",
  marginRight: "10px",
  textDecoration: "none",
  color: "inherit",
  paddingLeft: "5px",
  alignSelf: "center",
  display: "inline-block",
});
export default function ButtonAppBar() {
  const dataState = useSelector((state) => state);
console.log(dataState)
console.log("dataState")

  const pages = [
   { title: "login", path: "/login" },
    { title: "signup", path: "/signup" },
    dataState.id!=="-5"&&  { title: "profile", path: "/profile" },
    { title: "home", path: "/" },
    dataState.id!=="-5"&&  { title: "yourTravels", path: "/driverTravels" },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  // const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  // const menuId = 'primary-search-account-menu';
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
              {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ title, path }) => (
                // <Button
                //   key={page}
                //   onClick={handleCloseNavMenu}
                //   sx={{ my: 2, color: 'white', display: 'block' }}
                // >
                //   {page}
                // </Button>
                <Link key={path} to={path}>
                  <SpanDesign>
                    <div>{title}</div>
                  </SpanDesign>
                </Link>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {pages.map(({ title, path }) => (
                  <MenuItem key={title} onClick={handleCloseUserMenu}>
                    <Typography 
                      sx={{ width: "150px", padding: "5px" }}
                      textAlign="center"
                    >
                      <Link key={path} to={path} >
                        <SpanDesign2>
                          <div >{title}</div>
                        </SpanDesign2>
                      </Link>{" "}
                      <Divider variant="middle" />
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
