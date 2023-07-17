import React, { useState, useEffect } from "react";
import TravelService from "../../SERVICES/TravelService";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
export default function DriverTravels() {
  const data = useSelector((state) => state);
  const userId=data.id
  const [futureTravelsByUserId, setFutureTravelsByUserId] = useState([]);
  const [pastTravelsByUserId, setPastTravelsByUserId] = useState([]);
  useEffect(() => {
    // TravelService.getFutureTravelsByUserId(userId).then((res) => {
    //     setFutureTravelsByUserId(res);
    // });
    TravelService.getPastTravelsByUserId(userId).then((res) => {
        setPastTravelsByUserId(res);
    });
  }, []);

  return (
    <>
      <h1>DriverTravels</h1>
      {/* לעבור על הרשימה map ולהציג כל איבר */}
      <Box style={{ display: "flex" }}>
        {/* <Typography color="primary" variant="h6">
          All futureTravelsByUserId:
          {futureTravelsByUserId.map((travel) => (
            <Typography key={travel.id}>{travel.sourceCity}{travel.sourceStreet}</Typography>
          ))}
        </Typography> */}
        {/* xxxx */}
        <Typography color="primary" variant="h6">
          past Travel:
          {pastTravelsByUserId.map((travel) => (
            <Typography key={travel.id}>{travel.sourceCity}{travel.sourceStreet}</Typography>
          ))}
        </Typography>
      </Box>
    </>
  );
}
