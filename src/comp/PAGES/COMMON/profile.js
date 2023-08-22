import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { Typography, Box, TextField, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Users from "../../SERVICES/UserService";

export default function Profile() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [users, setUsers] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [objUser, setObjUser] = useState({
    Id: data.id,
    UserName: data.userName,
    UserEmail: data.userEmail,
    UserPassword: data.userPassword,
    UserPhone: data.userPhone,
  });
  const [errors, setErrors] = useState({
    UserName: "",
    UserEmail: "",
    UserPassword: "",
    UserPhone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    Users.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const onChange = (key, selected) => {
    setErrors({ ...errors, [key]: validate(key, selected) });
    setObjUser((prev) => ({ ...prev, [key]: selected }));
  };
  const onSubmit = async () => {
    var res = await fetch(`https://localhost:7293/api/User/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUser),
    });
    if(res.ok)
    {
      var data= await res.json()
    }
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
    // navigate("/");
  }

  const beforeonSubmit = async () => {
    let validationErrors = {};
    Object.keys(objUser).forEach((name) => {
      const error = validate(name, objUser[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setOpenDialog(true);
    console.log(objUser);
    
  };

  const validate = (name, value) => {
    switch (name) {
      case "UserName":
        if (!value || value.trim() === "") {
          return "First Name";
        } else {
          return "";
        }
      case "UserPhone":
        if (!value || value.trim() === "") {
          return "Phone Number";
        } else if (!value.match(/^[0-9]\d{9}$/)) {
          return "Invalid Phone Number";
        } else {
          return "";
        }
      case "UserEmail":
        if (!value) {
          return "Email";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Invalid Email";
        } else {
          return "";
        }
      case "UserPassword":
        if (!value) {
          return "Password";
        } else if (value.length < 8 || value.length > 15) {
          return "Please enter 8 characters only";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "start",
        magin: "10px",
        padding: "10px",
      }}
    >
      <Box style={{ marginTop: "30px" }}>
        <Typography color="primary" variant="h4">
          Profile
        </Typography>
      </Box>
      <Box
        style={{
          margin: "10px",
          padding: "10px",
          width: "400px",
        }}
      >
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            defaultValue={data.userName}
            // value={objUser.userName}
            onChange={(e) => onChange("UserName", e.target.value)}
            label="UserName:"
          />
          {errors.UserName && (
            <Alert severity="error">{errors.UserName} </Alert>
          )}
        </Box>
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            defaultValue={data.userPassword}
            onChange={(e) => onChange("UserPassword", e.target.value)}
            label="UserPassword:"
          />
          {errors.UserPassword && (
            <Alert severity="error">{errors.UserPassword} </Alert>
          )}
        </Box>
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            defaultValue={data.userPhone}
            onChange={(e) => onChange("UserPhone", e.target.value)}
            label="Phone:"
          />
          {errors.UserPhone && (
            <Alert severity="error">{errors.UserPhone} </Alert>
          )}
        </Box>
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            defaultValue={data.userEmail}
            onChange={(e) => onChange("UserEmail", e.target.value)}
            label="UserEmail:"
          />
          {errors.UserEmail && (
            <Alert severity="error">{errors.UserEmail} </Alert>
          )}
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={() => beforeonSubmit()}>
            Save Changes
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Box>
        {openDialog && (
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Thank you for using our service
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  For save changes click here or continue 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() =>{ onSubmit();handleClose()}}>
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
        {/* <Box style={{ display: "flex" }}>
        <Typography color="primary" variant="h6">
          All users:
          {users.map((user) => (
            <Typography key={user.id}>{user.userName}</Typography>
          ))}
        </Typography>
      </Box> */}
      </Box>
    </Box>
  );
}
