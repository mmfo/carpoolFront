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

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);
  const [userObj, setUserObj] = useState({});

  const onChange = (selected, key) => {
    setUserObj((prev) => ({ ...prev, [key]: selected }));
  };
  const handleClickOpen = () => {
    props.setOpenDialog(true);
  };

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const sendEmail = async () => {
    // userobj= get from redux
    // onChange("m0583267055@gmail.com", "UserEmail")
    // onChange("1", "UserPassword")
    // onChange("ההההה", "UserName")
    userObj.UserEmail = "m0583267055@gmail.com";
    userObj.UserPassword = "1";
    userObj.UserName = "vfghfh";
    userObj.Id = 23;
    console.log("userObj", userObj);

    var res = await fetch(`https://localhost:7293/api/User/SendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
  };
  const sendEmail2 = async () => {
    var res = await fetch(`https://localhost:7293/api/User/what`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
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
              <WhatsAppIcon />
            </IconButton>
            <IconButton>
              <MailOutlineIcon onClick={sendEmail} />
            </IconButton>
            <IconButton>
              <PhoneForwardedIcon onClick={sendEmail2} />
            </IconButton>
            <IconButton>
              <SmsIcon />
            </IconButton>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
