import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

import { useNavigate } from "react-router-dom";
import CardTravel from "./cardTravel";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Travel from "../../SERVICES/TravelService";
// import {
//   Autocomplete as MuiAutocomplete,
//   TextField,
//   Button,
// } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { debounce } from "@mui/material/utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import parse from "autosuggest-highlight/parse";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";


export default function TravelSearch() {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const apikey = "AIzaSyCFUQk0JFC-Lxpz5jpdmmtJJUFBVFmcoJI";

  const navigate = useNavigate();
  const [searchTravel, setSearchTravel] = useState({
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "",

    TimeTravel: new Date(),
    freeSpace: 1,
  });

  const [foundTravelList, setFoundTravelList] = useState([]);
  const [switchCecked, setSwitchCecked] = useState(true);

  const onChange = (selected, key) => {
    setSearchTravel((prev) => ({ ...prev, [key]: selected }));
  };

  const handleSourceAddressSelect = (place) => {
    const addressComponents = place.address_components;
    addressComponents.forEach((component) => {
      const componentType = component.types[0];
      switch (componentType) {
        case "locality":
          onChange(component.long_name, "SourceCity");
          break;
        case "route":
          onChange(component.long_name, "SourceStreet");
          break;
        case "street_number":
          onChange(component.long_name, "SourceHouseNumber");
          break;
        default:
          break;
      }
    });
  };
  const handleDestAddressSelect = (place) => {
    const addressComponents = place.address_components;
    addressComponents.forEach((component) => {
      const componentType = component.types[0];
      switch (componentType) {
        case "locality":
          onChange(component.long_name, "DestCity");
          break;
        case "route":
          onChange(component.long_name, "DestStreet");
          break;
        case "street_number":
          onChange(component.long_name, "DestHouseNumber");
          break;
        default:
          break;
      }
    });
  };

  const onSubmit = async () => {
    var res = await Travel.TravelSearch(searchTravel);
    console.log(res);
    setFoundTravelList(res);
    console.log(foundTravelList);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD_rM9VqK4T22X3aa29DTFOpL_r3fx1s0c",//map
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

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
      <Typography color="primary" variant="h4">
        TravelSearch
      </Typography>
      <FormControlLabel
        value="top"
        control={<Switch color="primary" />}
        label="נסיעה עכשוית"
        checked={switchCecked}
        labelPlacement="top"
        onChange={() => setSwitchCecked(!switchCecked)}
      />

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "95%" },
          margin: "0 auto",
          display: "flex",
          padding: "60px",
        }}
      >
        <Box
          style={{
            "& .MuiTextField-root": { m: 1, width: "95%" },
            margin: "0 auto",
            width: "400px",
          }}
        >
          <Grid item xs>
            {switchCecked ? (
              <>
                <div style={{ width: "400px", marginTop: "20px" }}>
                  <span style={{ color: "pink" }}>Source</span>
                  <TextField
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    inputRef={materialRefSource}
                  />
                </div>
                <div style={{ width: "400px", marginTop: "20px" }}>
                  <span style={{ color: "pink" }}>Dest</span>
                  <TextField
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    noOptionsText="No locations"
                    label="No locations"

                    inputRef={materialRefDest}
                  />
                </div>
                <TextField
                  type="number"
                  defaultValue="1"
                  id="outlined-basic"
                  label="Free space:"
                  variant="outlined"
                />
              </>
            ) : (
                <>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="נסיעה קבועה"
                  />
                </>
              )}
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Button variant="outlined" onClick={onSubmit}>
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
        {foundTravelList.length > 0 &&
          foundTravelList.map((item) => {
            return (
              <>
                <CardTravel data={item} />
              </>
            );
          })}
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={center} />
            <></>
          </GoogleMap>
        ) : (
            <>gkjfdkldkl</>
          )}
      </Box>
    </>
  );
}
