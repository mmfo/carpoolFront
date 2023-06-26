import React, { useState, useEffect, useCallback } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import CardTravel from "./cardTravel";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Travel from "../../SERVICES/TravelService";
import ShowMap from "./googleMap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch, CircularProgress, Alert } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Loader } from "@googlemaps/js-api-loader";
import GMap from "./googleMap";

const apikey = "AIzaSyCFUQk0JFC-Lxpz5jpdmmtJJUFBVFmcoJI";

export default function TravelSearch() {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const navigate = useNavigate();
  const [searchTravel, setSearchTravel] = useState({
    //{ address: 'קהילות יעקב , קרית ספר Street, 1 House Number' }
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "",

    DestCity: "בני ברק",
    DestStreet: "דונולו",
    DestHouseNumber: "",

    TimeTravel: new Date(),
    freeSpace: 1,
  });

  const [foundTravelList, setFoundTravelList] = useState([{
    destCity:  "Tel Aviv-Yafo",
  destHouseNumber  :  "",
  destStreet  :  "Allenby Street",
  freeSpace
  :
  1,
  sourceCity  :
  "Bnei Brak",
  sourceHouseNumber
  :
  "",
  sourceStreet
  :
  "Donnolo Street",
  timeTravel
  :
  "2023-06-07T18:15:23.824Z",
  userEmail
  :
  "m0583267055@gmail.com",
  userName
  :
  "ג",
  userPhone
  :
  null
},{   destCity:  "Tel Aviv-Yafo",
destHouseNumber  :  "",
destStreet  :  "Allenby Street",
freeSpace
:
1,
sourceCity  :
"Bnei Brak",
sourceHouseNumber
:
"",
sourceStreet
:
"Donnolo Street",
timeTravel
:
"2023-06-07T18:15:23.824Z",
userEmail
:
"m0583267055@gmail.com",
userName
:
"ג",
userPhone
:
null}]);
  const [switchCecked, setSwitchCecked] = useState(true);
  const [directions, setDirections] = useState(null);

  const onChange = (selected, key) => {
    setSearchTravel((prev) => ({ ...prev, [key]: selected }));
  };
  const [loadMap, setLoadMap] = useState(false);
  const [loadResultSearch, setResultSearch] = useState(false);
  const [emptyFoundTravelList, setEmptyFoundTravelList] = useState(false);

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
    setResultSearch(true)
    var res = await Travel.TravelSearch(searchTravel);
    console.log(res);
    setFoundTravelList(res);
    console.log("foundTravelList", foundTravelList);
    if (foundTravelList.length == 0) {
      setEmptyFoundTravelList(true)
    }
    setResultSearch(false)
  };
  // const onclickmap = async () => {
  //   var res = await Travel.NevigateRoute();
  //   console.log(res);
  //   setRoute(res)
  // };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: "AIzaSyD_rM9VqK4T22X3aa29DTFOpL_r3fx1s0c", //map
  });

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
    // style:{ width: "70%" },
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
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography color="primary" variant="h4">
          TravelSearch
        </Typography>
        <Box style={{ marginTop: "20px" }}>
          <FormControlLabel
            value="top"
            color="primary"
            control={<Switch color="primary" />}
            label={
              <Typography color="primary" variant="h6">
                Current Travel
              </Typography>
            }
            checked={switchCecked}
            labelPlacement="top"
            onChange={() => setSwitchCecked(!switchCecked)}
          />
        </Box>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1.5, width: "95%" },
          justifyContent: "space-evenly",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "space-between ",
        }}
      >
        <Box
          style={{
            "& .MuiTextField-root": { m: 1 },
            margin: "0 auto",
            // width: "400px",
            flexDirection: "column",
            width: "30%",
            display: "flex",
          }}
        >
          {/* <Grid item xs> */}
          {switchCecked ? (
            <Box>
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
                  color="secondary"
                  variant="outlined"
                  noOptionsText="No locations"
                  label="Enter location"
                  inputRef={materialRefSource}
                />
              </Box>
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
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  noOptionsText="No locations"
                  label="Enter a location"
                  inputRef={materialRefDest}
                />
              </Box>
              <Box>
                <Typography color="primary" style={{ display: "flex" }}>
                  Free Space:
                </Typography>
                <TextField
                  type="number"
                  defaultValue="1"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Box>
            </Box>
          ) : (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <Typography color="primary" variant="h6">
                      Regular travel
                  </Typography>
                  }
                />
              </Box>
            )}
          {/* </Grid> */}

          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <Button color="secondary" variant="contained" onClick={onSubmit}>
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
          </Box>
        </Box>

        <Box
          style={{
            display: "flex",
            // width: "30%",
            justifyContent: "center",
            marginRight: "10px",
          }}
        >

          {loadResultSearch ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
              <p>
                {/* {emptyFoundTravelList&& <Alert>not found</Alert>} */}
                {foundTravelList.length > 0 &&
                  foundTravelList.map((item) => {
                    return (
                      <Box>
                        <CardTravel data={item} />
                      </Box>
                    );
                  })}
              </p>
            )}

        </Box>
        <Box style={{ display: "flex", width: "30%" }}>
          {!loadMap ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
              <GMap searchTravel={searchTravel} />
            )}
        </Box>
      </Box>
    </>
  );
}
