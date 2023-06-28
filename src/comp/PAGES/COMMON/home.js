import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";


export default function Home() {
  const navigate = useNavigate();
  return (

    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "95%" },
        margin: "0 auto ",
        maxWidth: "400px",
        textAlign: "center",
      }}
    >
      <Box style={{ marginTop: "50px", marginBottom: "15px" }}>
        <Typography
         color="primary"
          variant="h4">
          Home
        </Typography>
      </Box>
      <Typography color="primary" variant="h5">
        driver
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/addTravel")}
        >
          addTravel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/driverTravel")}
        >
          driverTravel
        </Button>
      </div>
      <Typography
       color="primary" 
      variant="h5">
      passenger
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/passengerTravel")}
        >
          passengerTravel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/travelSearch")}
        >
          travelSearch
        </Button>
      </div>
    </Box>
  );
}
