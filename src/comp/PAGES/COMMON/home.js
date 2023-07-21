import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          marginTop: "150px",
          display: "flex",
          padding: "15px",
          justifyContent: "flex-end",
          paddingRight: "200px",
        }}
      >
        <Box
          style={{
            padding: "15px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/addTravel")}
          >
            addTravel
          </Button>
        </Box>
        <Box
          style={{
            padding: "15px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/travelSearch")}
          >
            travelSearch
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
