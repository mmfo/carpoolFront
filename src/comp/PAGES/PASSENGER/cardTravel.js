import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AlertDialog from "./DialogMui";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const CardTravel = ({ data, setSearchTravel }) => {
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handlecreateNavigate = () => {
    debugger;
    setSearchTravel((prev) => ({
      ...prev,
      ["SourceCity"]: data.sourceCity,
      ["SourceStreet"]: data.sourceStreet,
      ["SourceHouseNumber"]: data.sourceHouseNumber,
    }));
    setSearchTravel((prev) => ({
      ...prev,
      ["DestCity"]: data.destCity,
      ["DestStreet"]: data.destStreet,
      ["DestHouseNumber"]: data.destHouseNumber,
    }));
  };
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={4} onClick={() => navigate()}>
      <Card
        sx={{
          "& .MuiCard-root": { mb: 1.5 },
          minWidth: 275,
          textAlign: "start",
        }}
      >
        <CardContent
          sx={{
            "& .MuiCardContent-root": { mb: 1.5 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ mb: 1.5 }} color="primary">
            <Box fontWeight="bold" display="inline">
              Source City :
            </Box>
            {data.id}{data.sourceCity}, {data.sourceStreet},{data.sourceHouseNumber}
          </Typography>

          {/* <Typography sx={{ mb: 1.5 }} color="primary">
            id:{data.id},
          </Typography> */}
          <Typography sx={{ mb: 1.5 }} color="primary">
            <Box fontWeight="bold" display="inline">
              Dest City :
            </Box>
            {data.destCity}, {data.destStreet},{data.destHouseNumber}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="primary">
            {/* יהיה זמין בעוד חמש דקות */}
            <Box fontWeight="bold" display="inline">
              Availability within five minutes :
            </Box>
            {data.timeTravel}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="primary">
            <Box fontWeight="bold" display="inline">
              Free Space:
            </Box>
            {data.freeSpace ? data.freeSpace : 1}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="primary">
            <Box fontWeight="bold" display="inline">
              Detail Driver :
            </Box>
            {data.userName}, {data.userEmail}, {data.userPhone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setOpenDialog(true)}>
            {/* אני מעוניין בנסיעה זו */}
            Interested in this Travel
          </Button>
          <Button onClick={() => handlecreateNavigate()}>Show Map</Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
          </CardContent>
        </Collapse>
      </Card>
      {openDialog && (
        <AlertDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
    </Grid>
  );
};
export default CardTravel;
