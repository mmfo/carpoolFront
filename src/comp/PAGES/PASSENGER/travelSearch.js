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
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "1",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "1",

    TimeTravel: new Date(),
    FreeSpace: 1,
    Distance: 1000,
  });

  const [foundTravelList, setFoundTravelList] = useState([
    // {
    //   destCity: "Tel Aviv-Yafo",
    //   destHouseNumber: "",
    //   destStreet: "Allenby Street",
    //   freeSpace: 1,
    //   sourceCity: "Bnei Brak",
    //   sourceHouseNumber: "",
    //   sourceStreet: "Donnolo Street",
    //   timeTravel: "2023-06-07T18:15:23.824Z",
    //   userEmail: "m0583267055@gmail.com",
    //   userName: "ג",
    //   userPhone: null,
    // },
    // {
    //   destCity: "Tel Aviv-Yafo",
    //   destHouseNumber: "",
    //   destStreet: "Allenby Street",
    //   freeSpace: 1,
    //   sourceCity: "Bnei Brak",
    //   sourceHouseNumber: "",
    //   sourceStreet: "Donnolo Street",
    //   timeTravel: "2023-06-07T18:15:23.824Z",
    //   userEmail: "m0583267055@gmail.com",
    //   userName: "ג",
    //   userPhone: null,
    // },
  ]);
  const [switchCecked, setSwitchCecked] = useState(true);
  const [directions, setDirections] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [errors, setErrors] = useState({
    SourceCity: "",
    SourceStreet: "",
    SourceHouseNumber: "",

    DestCity: "",
    DestStreet: "",
    DestHouseNumber: "",

    // TimeTravel: new Date(), // new Date(),
    // UserId: "",
  });
  const onChange = (selected, key) => {
    setErrors({ ...errors, [key]: validate(key, selected) });
    setSearchTravel((prev) => ({ ...prev, [key]: selected }));
  };
  const [loadMap, setLoadMap] = useState(false);
  const [loadResultSearch, setloadResultSearch] = useState(false);
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
    let validationErrors = {};
    Object.keys(searchTravel).forEach((name) => {
      const error = validate(name, searchTravel[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (
      searchTravel.SourceCity &&
      searchTravel.SourceStreet &&
      searchTravel.DestCity &&
      searchTravel.DestStreet
    ) {
      console.log(searchTravel);
      searchTravel.TimeTravel = new Date(
        searchTravel.TimeTravel.getTime() + 3 * 60 * 60 * 1000
      );
    }
    setloadResultSearch(true);
    var res = await Travel.TravelSearch(searchTravel);
    console.log(res);
    setFoundTravelList(res);
    console.log("foundTravelList", foundTravelList);
    if (res.length == 0) {
      setEmptyFoundTravelList(true);
    } else {
      setEmptyFoundTravelList(false);
    }
    setloadResultSearch(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: "AIzaSyD_rM9VqK4T22X3aa29DTFOpL_r3fx1s0c", //map
  });
  useEffect(() => {
    setShowMap(true);
  }, [searchTravel]);
  const { ref: materialRefSource } = usePlacesWidget({
    apiKey: { apikey },
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
    onPlaceSelected: (place) => {
      handleDestAddressSelect(place);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "il" },
    },
  });

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
  return (
    <Box>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography color="primary" variant="h4">
            TravelSearch
          </Typography>
        </Box>
        <Box
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
                  variant="outlined"
                  noOptionsText="No locations"
                  inputRef={materialRefSource}
                />
              </Box>
              {(errors.SourceCity ||
                errors.SourceStreet ||
                errors.SourceHouseNumber) && (
                <Alert severity="error">
                  {errors.SourceCity} {errors.SourceStreet}{" "}
                  {errors.SourceHouseNumber}
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
                  fullWidth
                  variant="outlined"
                  noOptionsText="No locations"
                  inputRef={materialRefDest}
                />
              </Box>
              {(errors.DestCity ||
                errors.DestStreet ||
                errors.DestHouseNumber) && (
                <Alert severity="error">
                  {errors.DestCity} {errors.DestStreet} {errors.DestHouseNumber}
                </Alert>
              )}
              <Box>
                <Typography color="primary" style={{ display: "flex" }}>
                  Free Space:
                </Typography>
                <TextField
                  type="number"
                  defaultValue="1"
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value, "FreeSpace")}
                />
              </Box>
              <Box>
                <Typography color="primary" style={{ display: "flex" }}>
                  Distance :
                </Typography>
                <TextField
                  type="number"
                  defaultValue="1000"
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => onChange(e.target.value, "Distance")}
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

          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" onClick={onSubmit}>
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
            justifyContent: "center",
            marginRight: "80px",
          }}
        >
          {loadResultSearch ? (
            <Box style={{ margin: "220px", display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {emptyFoundTravelList && (
                <Box>
                  <Alert severity="error">not found</Alert>
                </Box>
              )}
              {foundTravelList.length > 0 &&
                foundTravelList.map((item) => {
                  return (
                    <Box style={{ margin: "20px" }}>
                      <CardTravel
                        flag={true}
                        data={item}
                        setSearchTravel={setSearchTravel}
                        searchTravel={searchTravel}
                      />
                    </Box>
                  );
                })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
