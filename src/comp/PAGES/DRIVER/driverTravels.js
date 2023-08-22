import React, { useState, useEffect } from "react";
import TravelService from "../../SERVICES/TravelService";
import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CardTravel from "../PASSENGER/cardTravel";
// import CardTravelDriver from './cardTravelDriver'
export default function DriverTravels() {
  const data = useSelector((state) => state);
  const userId = data.id;
  const [searchTravel, setSearchTravel] = useState([
    //   SourceCity: "קרית ספר",
    //   SourceStreet: "",
    //   SourceHouseNumber: "1",
    // },{
    //   DestCity: "בני ברק",
    //   DestStreet: "",
    //   DestHouseNumber: "1",
    // },{
    //   TimeTravel: new Date(),
    //   freeSpace: 1,
  ]);

  const [futureTravelsByUserId, setFutureTravelsByUserId] = useState([]);
  const [pastTravelsByUserId, setPastTravelsByUserId] = useState([]);
  useEffect(() => {
    TravelService.getFutureTravelsByUserId(userId).then((res1) => {
      setFutureTravelsByUserId(res1);
    });
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
          flexWrap: "wrap",
        }}
      >
        <Box style={{ display: "flex", padding: "15px" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Typography color="primary" variant="h6">
                Past Travel
              </Typography>
            </Grid>

            <br />
            {pastTravelsByUserId.map((travel) => {
              return (
                <Grid item xs>
                  <Box style={{ margin: "20px" }}>
                    <CardTravel
                      data={travel}
                      setSearchTravel={setSearchTravel}
                      searchTravel={searchTravel}
                      setPastTravelsByUserId={setPastTravelsByUserId}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box
          style={{
            display: "flex",
            padding: "15px",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
          <Typography color="primary" variant="h6" style={{direction:'rtl'}}>
            Future Travel
          </Typography>
          </Grid>
          <br />
          {futureTravelsByUserId.length > 0 &&
            futureTravelsByUserId.map((travel) => {
              return (
                <Grid item xs>
                <Box style={{ margin: "20px" }}>
                  <CardTravel
                    data={travel}
                    setSearchTravel={setSearchTravel}
                    searchTravel={searchTravel}
                    setFutureTravelsByUserId={setFutureTravelsByUserId}
                  />
                </Box>
                </Grid>
              );
            })}
            </Grid>
        </Box>


      </Box>
    </Box>
  );
}
