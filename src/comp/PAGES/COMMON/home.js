import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "95%" },
        margin: "0 auto",
        maxWidth: "400px",
        textAlign: "center",
      }}
    >
      <h1>Home</h1>
      <h2>driver</h2>
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
          // color="primary"
          onClick={() => navigate("/addTravel")}
        >
          addTravel
        </Button>
        <Button
          variant="outlined"
          // color="primary"
          onClick={() => navigate("/driverTravel")}
        >
          driverTravel
        </Button>
      </div>

      {/* <button onClick={() => navigate("/addTravel")}>addTravel</button>
          <button onClick={() => navigate("/driverTravel")}>
            driverTravel
          </button> */}
      <h2>passenger</h2>
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
        // color="primary"
        onClick={() => navigate("/passengerTravel")}
      >
        passengerTravel
      </Button>
      <Button
        variant="outlined"
        // color="primary"
        onClick={() => navigate("/travelSearch")}
      >
        travelSearch
      </Button>
      </div>
      {/* <button onClick={() => navigate("/passengerTravel")}>
            passengerTravel
          </button>
          <button onClick={() => navigate("/travelSearch")}>
            travelSearch
          </button> */}
      {/* </div> */}
      {/* </section> */}
    </Box>
  );
}
