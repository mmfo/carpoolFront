import React, { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import AutocompleteReactGoogle, {
  usePlacesWidget,
} from "react-google-autocomplete";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";

import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { debounce } from "@mui/material/utils";
import parse from "autosuggest-highlight/parse";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTravel() {
  const dataState = useSelector((state) => state);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [objTravel, setObjTravel] = useState({
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "1",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "1",

    TimeTravel: new Date(), // new Date(),
    UserId: parseInt(dataState.id),
    freeSpace: 1,
  });
  const [errors, setErrors] = useState({
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "",

    TimeTravel: new Date(), // new Date(),
    UserId: dataState.id,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const apikey = "AIzaSyCFUQk0JFC-Lxpz5jpdmmtJJUFBVFmcoJI";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = (name, value) => {
    switch (name) {
      case "SourceCity":
        if (!value)
          //||value.trim() === "")
          return "SourceCity ";
        else return "";
      case "SourceStreet":
        if (!value)
          // || value.trim() === "")
          return " SourceStreet";
        else return "";
      case "SourceHouseNumber":
        if (!value)
          // || value.trim() === "")
          return "SourceHouseNumber ";
        else return "";
      case "DestCity":
        if (!value)
          // || value.trim() === "")
          return "DestCity ";
        else return "";
      case "DestStreet":
        if (!value)
          // || value.trim() === "")
          return " DestStreet  ";
        else return "";
      case "DestHouseNumber":
        if (!value)
          // || value.trim() === "")
          return "DestHouseNumber";
        else return "";
      default: {
        return "";
      }
    }
  };

  const onChange1 = (selected, key) => {
    console.log(selected);
    setErrors({ ...errors, [key]: validate(key, selected) });
    setObjTravel((prev) => ({ ...prev, [key]: selected }));
    console.log("onChange1 ", objTravel, "   ", key);
  };

  const createTravel = async () => {
    let validationErrors = {};
    Object.keys(objTravel).forEach((name) => {
      const error = validate(name, objTravel[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (
      objTravel.SourceCity &&
      objTravel.SourceStreet &&
      objTravel.DestCity &&
      objTravel.DestStreet
    ) {
      console.log(objTravel);
      objTravel.TimeTravel = new Date(
        objTravel.TimeTravel.getTime() + 3 * 60 * 60 * 1000
      );

      var res = await fetch(`https://localhost:7293/api/travels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objTravel),
      });
      // setErrorMessage("This travel in db!");
      // setTimeout(() => {
      //   setErrorMessage(" ");
      // }, 3000);

      // alert("this travel in db");
    }
    setOpenDialog(true);
  };
  const handleSourceAddressSelect = (place) => {
    const addressComponents = place.address_components;
    console.log("addressComponents", addressComponents);
    const addressObj = {};

    // Loop through each address component and extract the country, city, and street
    addressComponents.forEach((component) => {
      const componentType = component.types[0];
      switch (componentType) {
        case "locality":
          addressObj.city = component.long_name;
          onChange1(component.long_name, "SourceCity");
          break;
        case "route":
          addressObj.street = component.long_name;
          onChange1(component.long_name, "SourceStreet");
          break;
        case "street_number":
          addressObj.houseNumber = component.long_name;
          onChange1(component.long_name, "SourceHouseNumber");
          break;
        default:
          break;
      }
    });

    console.log(addressObj); // Object containing country, city, and street
  };
  const handleDestAddressSelect = (place) => {
    const addressComponents = place.address_components;
    const addressObj = {};

    // Loop through each address component and extract the country, city, and street
    addressComponents.forEach((component) => {
      const componentType = component.types[0];
      switch (componentType) {
        case "locality":
          addressObj.city = component.long_name;
          onChange1(component.long_name, "DestCity");
          break;
        case "route":
          addressObj.street = component.long_name;
          onChange1(component.long_name, "DestStreet");
          break;
        case "street_number":
          addressObj.houseNumber = component.long_name;
          onChange1(component.long_name, "DestHouseNumber");
          break;
        default:
          break;
      }
    });

    console.log(addressObj); // Object containing country, city, and street
  };

  const onChange2 = (selected) => {
    console.log(selected);
    setSelectedDateTime(selected);
    setErrors((prevErrors) => ({
      ...prevErrors,
      TimeTravel: validate("TimeTravel", selected),
    }));
    setObjTravel((prevObjTravel) => ({
      ...prevObjTravel,
      TimeTravel: selected,
    }));
    console.log("onChange1 ", objTravel, "   TimeTravel");
  };

  const { ref: materialRefSource } = usePlacesWidget({
    apiKey: { apikey },
    //style:{ width: "70%" },
    onPlaceSelected: (place) => {
      handleSourceAddressSelect(place);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "il" },
    },
  });
  const { ref: materialRefDest } = usePlacesWidget({
    apiKey: { apikey },
    //style:{ width: "70%" },
    onPlaceSelected: (place) => {
      handleDestAddressSelect(place);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "il" },
    },
  });

  return (
    <Box>
      <Box
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent:'center'
        }}
      >
        <Typography color="primary" variant="h4">
          Add Travel
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1.5, width: "95%" },
          margin: "0 auto",
          maxWidth: "400px",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {errorMessage && (
          <Alert sx={{ mt: "5px" }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <Box>
          <Typography
            color="primary"
            style={{
              display: "flex",
            }}
          >
            Source
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            inputRef={materialRefSource}
            noOptionsText="No locations"
          />
        </Box>

        {(errors.SourceCity ||
          errors.SourceStreet ||
          errors.SourceHouseNumber) && (
          <Alert severity="error">
            {errors.SourceCity} {errors.SourceStreet} {errors.SourceHouseNumber}
          </Alert>
        )}

        <Box>
          <Typography
            color="primary"
            style={{
              display: "flex",
            }}
          >
            Dest
          </Typography>
          <TextField
            variant="outlined"
            noOptionsText="No locations"
            fullWidth
            inputRef={materialRefDest}
          />
        </Box>

        {(errors.DestCity || errors.DestStreet || errors.DestHouseNumber) && (
          <Alert severity="error">
            {errors.DestCity} {errors.DestStreet} {errors.DestHouseNumber}
          </Alert>
        )}

        <Box>
          <Typography
            color="primary"
            style={{
              display: "flex",
            }}
          >
            Date Time picker
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={selectedDateTime}
              onChange={onChange2}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Typography color="primary" style={{ display: "flex" }}>
          Free Space:
        </Typography>
        <TextField
          type="number"
          defaultValue="1"
          id="outlined-basic"
          variant="outlined"
        />

        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={() => createTravel()}>
            add
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
              <DialogTitle id="alert-dialog-title">
                Thanks for adding a travel!
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Thank you for using our service
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  For more services you can continue on our website
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    navigate("/addTravel");
                    window.location.reload(false);
                  }}
                >
                  Add A New Travel
                </Button>
                <Button
                  onClick={() => {
                    navigate("/travelSearch");
                  }}
                >
                  Search A Travel
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
    </Box>
  );
}
