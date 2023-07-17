import React, { useState, useEffect } from "react";
import TravelService from "../../SERVICES/TravelService";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardTravel from "../PASSENGER/cardTravel";

export default function DriverTravels() {
  const data = useSelector((state) => state);
  const userId = data.id;
  const [searchTravel, setSearchTravel] = useState([{
    SourceCity: "קרית ספר",
    SourceStreet: "",
    SourceHouseNumber: "1",
  },{
    DestCity: "בני ברק",
    DestStreet: "",
    DestHouseNumber: "1",
  },{
    TimeTravel: new Date(),
    freeSpace: 1,
  }]);
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
    <Box style={{}}>
      <Box
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography color="primary" variant="h4">
          Driver Travels
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap:'wrap',

        }}
      >
        <Box
          style={{ display: "flex",
            padding: "15px" }}
        >
          <Typography color="primary" variant="h6">
            past Travel:
          </Typography>
          {searchTravel.map((travel) => {
          return (
            <Box style={{ margin: "20px" }}>
              <CardTravel
                data={travel}
                setSearchTravel={setSearchTravel}
                searchTravel={searchTravel}
              />
            </Box>
          );
          // <Typography key={travel.id}>
          //   {travel.sourceCity}
          //   {travel.sourceStreet}
          // </Typography>
        })}
        </Box>
        <Box
          style={{
            display: "flex",
            // backgroundColor: "yellow",
            padding: "15px",
          }}
        >
          <Typography color="primary" variant="h6">
            Future Travel:
          </Typography>
          {searchTravel.map((travel) => {
          return (
            <Box style={{ margin: "20px" }}>
              <CardTravel
                data={travel}
                setSearchTravel={setSearchTravel}
                searchTravel={searchTravel}
              />
            </Box>
          );
          // <Typography key={travel.id}>
          //   {travel.sourceCity}
          //   {travel.sourceStreet}
          // </Typography>
        })}
        </Box>
        {/* <h1>DriverTravels</h1> */}
        {/* לעבור על הרשימה map ולהציג כל איבר */}
        {/* <Box style={{ display: "flex" }}> */}
        {/* <Typography color="primary" variant="h6">
          All futureTravelsByUserId:
          {futureTravelsByUserId.map((travel) => (
            <Typography key={travel.id}>{travel.sourceCity}{travel.sourceStreet}</Typography>
          ))}
        </Typography> */}
        {/* xxxx */}
      </Box>
    </Box>
  );
}
