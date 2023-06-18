
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers';
import Autocomplete from "react-google-autocomplete";
import { useSelector } from 'react-redux';

export default function AddTravel() {
  const dataState = useSelector(state => state)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [objTravel, setObjTravel] = React.useState({
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "1",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "1",

    TimeTravel: "",// new Date(),
    UserId: parseInt(dataState.id),
    freeSpace: 1
  });
  const [errors, setErrors] = React.useState({
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "",

    TimeTravel: "",// new Date(),
    UserId: dataState.id
  });
  const apikey = "AIzaSyCFUQk0JFC-Lxpz5jpdmmtJJUFBVFmcoJI"

  const validate = (name, value) => {
    switch (name) {
      case "SourceCity":
        if (!value)//||value.trim() === "")
          return "❗SourceCity ";
        else
          return "";
      case "SourceStreet":
        if (!value)// || value.trim() === "")
          return "❗  SourceStreet";
        else
          return "";
      case "SourceHouseNumber":
        if (!value)// || value.trim() === "")
          return "❗SourceHouseNumber ";
        else
          return "";
      case "DestCity":
        if (!value)// || value.trim() === "")
          return "❗DestCity ";
        else
          return "";
      case "DestStreet":
        if (!value)// || value.trim() === "")
          return "❗ DestStreet  ";
        else
          return "";
      case "DestHouseNumber":
        if (!value)// || value.trim() === "")
          return "❗ DestHouseNumber";
        else
          return "";
      default: {
        return "";
      }
    }
  };

  const onChange1 = (selected, key) => {
    console.log(selected)
    setErrors({ ...errors, [key]: validate(key, selected) })
    setObjTravel((prev) => ({ ...prev, [key]: selected }))
    console.log("onChange1 ", objTravel, "   ", key)
  }

  const createTravel = async () => {
    let validationErrors = {};
    Object.keys(objTravel).forEach(name => {
      const error = validate(name, objTravel[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return;
    }
    if (objTravel.SourceCity && objTravel.SourceStreet && objTravel.DestCity && objTravel.DestStreet) {
      console.log(objTravel)
      var res = await fetch(`https://localhost:7293/api/travels`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objTravel)
      })
      alert("this travel in db")
    }
  }

  const handleSourceAddressSelect = (place) => {
    const addressComponents = place.address_components;
    console.log(addressComponents)
    const addressObj = {};

    // Loop through each address component and extract the country, city, and street
    addressComponents.forEach((component) => {
      const componentType = component.types[0];
      switch (componentType) {
        case "locality":
          addressObj.city = component.long_name;
          onChange1(component.long_name, "SourceCity")
          break;
        case "route":
          addressObj.street = component.long_name;
          onChange1(component.long_name, "SourceStreet")
          break;
        case "street_number":
          addressObj.houseNumber = component.long_name;
          onChange1(component.long_name, "SourceHouseNumber")
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
          onChange1(component.long_name, "DestCity")
          break;
        case "route":
          addressObj.street = component.long_name;
          onChange1(component.long_name, "DestStreet")
          break;
        case "street_number":
          addressObj.houseNumber = component.long_name;
          onChange1(component.long_name, "DestHouseNumber")
          break;
        default:
          break;
      }
    });

    console.log(addressObj); // Object containing country, city, and street
  };

  const onChange2 = (selected) => {
    console.log(selected);
    //selected = new Date(selected.getTime() + 3 * 60 * 60 * 1000);
    setSelectedDateTime(selected);
    setErrors((prevErrors) => ({ ...prevErrors, TimeTravel: validate("TimeTravel", selected) }));
    setObjTravel((prevObjTravel) => ({ ...prevObjTravel, TimeTravel: selected }));
    console.log("onChange1 ", objTravel, "   TimeTravel");
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '2rem' }}>Add Travel</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ marginBottom: '0.5rem' }}>Source</span>
             
              <Autocomplete 
              style={{ width: '180%',  padding: '10px',borderRadius: "10px"}}
                apiKey={apikey}
                onPlaceSelected={(place) => {
                  handleSourceAddressSelect(place)
                }}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: "il" },
                }}
              />

              <span style={{ color: 'red' }} className="text-danger">{errors.SourceCity}</span>
              <span style={{ color: 'red' }} className="text-danger">{errors.SourceStreet}</span>
              <span style={{ color: 'red' }} className="text-danger">{errors.SourceHouseNumber}</span>

            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ marginBottom: '0.5rem' }}>Destination</span>
              <Autocomplete
                apiKey={apikey}
                style={{ width: "35%" }}
                onPlaceSelected={(place) => {
                  handleDestAddressSelect(place)
                }}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: "il" },
                }}
              />
              <span style={{ color: 'red' }} className="text-danger">{errors.DestCity}</span>
              <span style={{ color: 'red' }} className="text-danger">{errors.DestStreet}</span>
              <span style={{ color: 'red' }} className="text-danger">{errors.DestHouseNumber}</span>
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date Time picker"
                value={selectedDateTime}
                onChange={onChange2}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ marginBottom: '0.5rem' }}>Free Space:</span>
              <input
                type="number"
                value={objTravel.freeSpace}
                onChange={(event) => onChange1(event.target.value, "freeSpace")}
              />
            </label>

          </div>
          <Button variant="contained" color="primary" onClick={() => createTravel()}>add</Button>
        </div></div>
    </>
  )
}

