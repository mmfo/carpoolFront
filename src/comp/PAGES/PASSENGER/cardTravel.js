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
import DialogMap from "./DialogMap";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TravelService from "../../SERVICES/TravelService";
import { useSelector } from "react-redux";

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

const CardTravel = ({flag, data, setSearchTravel,searchTravel,setPastTravelsByUserId }) => {
  const data1 = useSelector((state) => state);
  const userId = data1.id;
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [openDialogMap, setOpenDialogMap] = useState(false);
  const handleClose = () => {
    setOpenDialogDelete(false);
  };
  const handlecreateNavigate = () => {
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
  const deleteTravel= async () =>{
    var res = await fetch(`https://localhost:7293/api/travels/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    handleClose()
    // navigate('/driverTravels')
    if(res.ok)
    {
      TravelService.getPastTravelsByUserId(userId).then((res) => {
        setPastTravelsByUserId(res);
      });
    }
  }
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
            {/* {data.id+"   "} */}
            {data.sourceCity}, {data.sourceStreet},{data.sourceHouseNumber}
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
              Availability in :
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
        {flag ?<Button size="small" onClick={() => setOpenDialog(true)}>
            {/* אני מעוניין בנסיעה זו */}
            Interested in this Travel
          </Button>
          :
          <IconButton  onClick={() => setOpenDialogDelete(true)} > <DeleteForeverIcon /></IconButton> 
}
          <Button onClick={() => setOpenDialogMap(true)}>Show Map</Button>
          {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
          </CardContent>
        </Collapse>
      </Card>
      {openDialog && (
        <AlertDialog item={data} openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
      {
        openDialogMap&&
        <DialogMap openDialog={openDialogMap} setOpenDialog={setOpenDialogMap} data={data}/>
      }
      {openDialogDelete  && (
         <Dialog
         open={openDialogDelete}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">
          Are you sure about the deletion?
           {/* {"בחר צורת התכתבות עם הנהג"} */}
         </DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
            <DialogActions><Button variant="contained" onClick={()=>deleteTravel()}>delete</Button><Button onClick={handleClose}>cancle</Button ></DialogActions>
           </DialogContentText>
         </DialogContent>
       </Dialog>
      )}
    </Grid>
  );
};
export default CardTravel;
