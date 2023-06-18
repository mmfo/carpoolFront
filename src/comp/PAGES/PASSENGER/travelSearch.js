import React, { useEffect, useState } from "react";
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Button,
} from "@mui/material"; //

import Box from "@mui/material/Box";
// import TextField from '@mui/material/TextField';
//import Autocomplete from '@mui/material/Autocomplete';
import Autocomplete from "react-google-autocomplete";

import { useNavigate } from "react-router-dom";
import CardTravel from "./cardTravel";
import Grid from "@mui/system/Unstable_Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Checkbox from "@mui/material/Checkbox";
import Travel from "../../SERVICES/TravelService";

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
    googleMapsApiKey: "AIzaSyD_rM9VqK4T22X3aa29DTFOpL_r3fx1s0c",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <>
      <h1>TravelSearch</h1>
      <FormControlLabel
        value="top"
        control={<Switch color="primary" />}
        label="נסיעה עכשוית"
        checked={switchCecked}
        labelPlacement="top"
        onChange={() => setSwitchCecked(!switchCecked)}
      />

      <Grid
        container
        direction="row"
        // justifyContent="center"
        // alignItems="start"
        alignContent="flex-start"
        // display="flex"
      >
     
        <Grid item xs>
          {switchCecked ? (
            <>
              <div>
                <label>
                  Source
                  <Autocomplete
                    apiKey={apikey}
                    style={{ width: "35%" }}
                    onPlaceSelected={(place) => {
                      handleSourceAddressSelect(place);
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "il" },
                    }}
                  />
                </label>
              </div>
              <div>
                <label>Dest </label>
            
                <Autocomplete
                  apiKey={apikey}
                  style={{ width: "35%" }}
                  onPlaceSelected={(place) => {
                    handleDestAddressSelect(place);
                  }}
                  options={{
                    types: ["address"],
                    componentRestrictions: { country: "il" },
                  }}
                />
              </div>
              <div>
                <label>free space:</label>
                <input
                  type="number"
                  value={searchTravel.freeSpace}
                  onChange={(event) =>
                    onChange(event.target.value, "freeSpace")
                  }
                />
              </div>
            </>
          ) : (
            <>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="נסיעה קבועה"
              />
            </>
          )}
          <Button onClick={onSubmit}> Search </Button>
        </Grid>

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
      </Grid>
    </>
  );
}
