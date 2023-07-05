import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import image from "../../ASSETS/map.jpg";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      //  style={{ backgroundColor: "red" ,height:'100%'}}

      // style={{
      //   // backgroundColor: "green",
      //   height: "400px",
      //   width: "100%",
      //   backgroundImage: `url(${image})`,
      //   backgroundRepeat: 'no-repeat'

      // }}
    >
      <Box
        // component="form"
        sx={{
          // "& .MuiTextField-root": { m: 1, width: "95%" },
          margin: "0 auto ",
          maxWidth: "350px",
          textAlign: "center",
          // alignItems: "center",
          // backgroundColor: "red",
          marginTop: "250px",
          marginBottom: "15px",
          marginLeft: "950px",
          display: "flex",
          justifyContent: "space-around",
          // backgroundColor: "pink",
        }}
      >
        {/* <Box style={{}}> */}
        {/* <Typography
         color="primary"
          variant="h4">
          Home
        </Typography> */}
        {/* </Box> */}
        {/* <Typography color="primary" variant="h5">
        driver
      </Typography> */}
        {/* <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      > */}
        <Button
          // variant="outlined"
          variant="contained"
          color="primary"
          onClick={() => navigate("/addTravel")}
        >
          addTravel
        </Button>
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/driverTravel")}
        >
          driverTravel
        </Button> */}
        {/* </div> */}
        {/* <Typography
       color="primary" 
      variant="h5">
      passenger
      </Typography> */}
        {/* <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      > */}
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/passengerTravel")}
        >
          passengerTravel
        </Button> */}
        <Button
          // variant="outlined"     
               variant="contained"

          color="primary"
          onClick={() => navigate("/travelSearch")}
        >
          travelSearch
        </Button>
        {/* </div> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
}
