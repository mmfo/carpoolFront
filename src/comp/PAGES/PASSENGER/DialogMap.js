import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import SmsIcon from "@mui/icons-material/Sms";
import IconButton from "@mui/material/IconButton";
import GMap from "./googleMap";
import { Box } from "@mui/material";
import { Switch, CircularProgress, Alert } from "@mui/material";
import { Loader } from "@googlemaps/js-api-loader";
import Travel from "../../SERVICES/TravelService";
export default function DialogMap(props) {
    const apikey = "AIzaSyCFUQk0JFC-Lxpz5jpdmmtJJUFBVFmcoJI";
  const [open, setOpen] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [loadMap, setLoadMap] = useState(false);
  const onChange = (selected, key) => {
    setUserObj((prev) => ({ ...prev, [key]: selected }));
  };
  const handleClickOpen = () => {
    props.setOpenDialog(true);
  };

  const handleClose = () => {
    props.setOpenDialog(false);
  };
const myObj={
    ["SourceCity"]: props.data.sourceCity,
    ["SourceStreet"]: props.data.sourceStreet,
    ["SourceHouseNumber"]: props.data.sourceHouseNumber,
 
    ["DestCity"]: props.data.destCity,
    ["DestStreet"]: props.data.destStreet,
    ["DestHouseNumber"]: props.data.destHouseNumber,
}
  useEffect(() => {
    const options = {
      apiKey: { apikey },
      version: "weekly",
      libraries: ["geometry"],
    };

    new Loader(options)
      .load()
      .then(() => {
        setLoadMap(true);
      })
      .catch((e) => {
        console.error(
          "Sorry, something went wrong: Please try again later. Error:",
          e
        );
      });
  }, []);
  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Choose a form of correspondence with the driver
          {/* {"בחר צורת התכתבות עם הנהג"} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         
          <Box style={{ display: "flex", width: "30%" }}>
            {!loadMap ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <GMap searchTravel={myObj} />
            )}
          </Box>
    
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
