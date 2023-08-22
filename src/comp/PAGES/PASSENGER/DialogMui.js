import React, { useState } from "react";
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
import { useSelector } from "react-redux";

export default function AlertDialog(props) {
  const data = useSelector((state) => state);
  const travel_and_user=props.item

  const [open, setOpen] = useState(false);
  const [objUser, setObjUser] = useState({
    Id: data.id,
    UserName: data.userName,
    UserEmail: data.userEmail,
    UserPassword: data.userPassword,
    UserPhone: data.userPhone,
  });

  const handleClickOpen = () => {
    props.setOpenDialog(true);
  };

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const SendEmailWithTravelDetail = async () => {
    console.log("objUser",  travel_and_user);
    var res = await fetch(`https://localhost:7293/api/User/SendEmailWithTravelDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(travel_and_user),
    });
  };
  const sendWhatsApp = async () => {
    var res = await fetch(`https://localhost:7293/api/User/what`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUser),
    });
  };
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
            <IconButton>
              <WhatsAppIcon onClick={()=>sendWhatsApp()}/>
            </IconButton>
            <IconButton>
              <MailOutlineIcon onClick={()=>SendEmailWithTravelDetail()} />
            </IconButton>
            {/* <IconButton>
              <PhoneForwardedIcon  />
            </IconButton>
            <IconButton>
              <SmsIcon />
            </IconButton> */}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
