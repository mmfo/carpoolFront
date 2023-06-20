import React, { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import AutocompleteReactGoogle, { usePlacesWidget } from "react-google-autocomplete";
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

export default function AddTravel() {
  const dataState = useSelector((state) => state);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
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

  const navigate = useNavigate();
  const apikey = "AIzaSyCFUQk0JFC-Lxpz5jpdmmtJJUFBVFmcoJI";

  const validate = (name, value) => {
    switch (name) {
      case "SourceCity":
        if (!value)
          //||value.trim() === "")
          return "❗SourceCity ";
        else return "";
      case "SourceStreet":
        if (!value)
          // || value.trim() === "")
          return "❗  SourceStreet";
        else return "";
      case "SourceHouseNumber":
        if (!value)
          // || value.trim() === "")
          return "❗SourceHouseNumber ";
        else return "";
      case "DestCity":
        if (!value)
          // || value.trim() === "")
          return "❗DestCity ";
        else return "";
      case "DestStreet":
        if (!value)
          // || value.trim() === "")
          return "❗ DestStreet  ";
        else return "";
      case "DestHouseNumber":
        if (!value)
          // || value.trim() === "")
          return "❗ DestHouseNumber";
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
      alert("this travel in db");
    }
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
    <>
      <h1>AddTravel</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "95%" },
          margin: "0 auto",
          maxWidth: "400px",
          textAlign: "center",
          // backgroundColor: "pink",
          padding: "60px",
        }}
      >
         

        <div style={{ width: "400px", marginTop: "20px" }}>
          <span style={{ color: "pink" }}>Source</span>
          <TextField
            fullWidth
            color="secondary"
            variant="outlined"
            inputRef={materialRefSource}
          />
        </div>


        {/* <span style={{ color: "red" }} className="text-danger"> */}
        <Alert severity="error">
          {errors.SourceCity} {errors.SourceStreet} {errors.SourceHouseNumber}
        </Alert>

        <div style={{ width: "400px", marginTop: "20px" }}>
          <span style={{ color: "pink" }}>Dest</span>
          <TextField
            fullWidth
            color="secondary"
            variant="outlined"
            inputRef={materialRefDest}
          />
        </div>

        <Alert severity="error">
          {errors.DestCity} {errors.DestStreet}  {errors.DestHouseNumber}
        </Alert>

        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date Time picker"
              value={selectedDateTime}
              onChange={onChange2}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <TextField
          type="number"
          defaultValue="1"
          id="outlined-basic"
          label="Free space:"
          variant="outlined"
        />

        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => createTravel()}
          >
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
      </Box>
    </>
  );
}
