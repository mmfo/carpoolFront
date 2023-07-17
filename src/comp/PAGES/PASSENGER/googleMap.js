import React, { useEffect, useRef, useState } from "react";

const GMap = ({ searchTravel }) => {
  const googleMapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  
  useEffect(() => {
    const googleMap = initGoogleMap();
    setMap(googleMap);
  }, []);

  useEffect(() => {
    debugger
    if (!map) return;

    const geocoder = new window.google.maps.Geocoder();
    console.log(searchTravel);
    console.log({
      address: `${searchTravel.DestCity}, ${searchTravel.DestStreet}, ${searchTravel.DestHouseNumber}`,//{ address: 'קהילות יעקב , קרית ספר Street, 1 House Number' }
    });
    geocoder.geocode(
      {
        address: `${searchTravel.SourceCity}, ${searchTravel.SourceStreet}, ${searchTravel.SourceHouseNumber}`,
      },
      (results, status) => {
        //{ address: `${searchTravel.SourceCity}, ${searchTravel.SourceStreet}, ${searchTravel.SourceHouseNumber}` }
        if (status === "OK" && results.length > 0) {
          const sourceLocation = results[0].geometry.location;
          setSource(sourceLocation);
        }
      }
    );

    geocoder.geocode(
      {
        address: `${searchTravel.DestCity}, ${searchTravel.DestStreet}, ${searchTravel.DestHouseNumber}`,
      },
      (results, status) => {
        //{ address: `${searchTravel.DestCity}, ${searchTravel.DestStreet}, ${searchTravel.DestHouseNumber}` }
        if (status === "OK" && results.length > 0) {
          const destinationLocation = results[0].geometry.location;
          setDestination(destinationLocation);
        }
      }
    );
  }, [map]);

  useEffect(() => {
    if (!map || !source || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    const request = {
      origin: source,
      destination: destination,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        directionsRenderer.setMap(map);
      }
    });
  }, [map, source, destination]);

  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      //center: new window.google.maps.LatLng(37.7699298, -122.4469157),
      zoom: 8,
    });
  };

  return <div ref={googleMapRef} style={{ width: 600, height: 500 }} />;
};

export default GMap;
