import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import image3 from "../../ASSETS//planingTravel1.jpg";

export default function Home() {
  const navigate = useNavigate();
  const dataState = useSelector((state) => state);

  return (
    // <div
    //   style={{
    //     backgroundImage: `url(${image3})`,
    //     height: "100vh",
    //     width: "100vw",
    //   }}
    // >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop="100px"
        marginLeft="400px"
      >
        {dataState.id !== "-5" && (
          <>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/addTravel")}
              >
                addTravel
              </Button>
            </Grid>
          </>
        )}

        <Grid item xs>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/travelSearch")}
          >
            travelSearch
          </Button>
        </Grid>
      </Grid>
    // </div>
  );
}
