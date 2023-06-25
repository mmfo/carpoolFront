// import React, { useEffect, useRef, useState } from 'react';

// const GMap = () => {
//   const googleMapRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [directionsDisplay, setDirectionsDisplay] = useState(null);

//   useEffect(() => {
//     const googleMap = initGoogleMap();
//     setMap(googleMap);
//   }, []);

//   useEffect(() => {
//     if (!map) return;

//     const geocoder = new window.google.maps.Geocoder();

//     geocoder.geocode({ address: 'Source Street Number, Source Street, Source City' }, (results, status) => {
//       if (status === 'OK' && results.length > 0) {
//         const sourceLocation = results[0].geometry.location;
//         setSource(sourceLocation);
//       }
//     });

//     geocoder.geocode({ address: 'Destination Street Number, Destination Street, Destination City' }, (results, status) => {
//       if (status === 'OK' && results.length > 0) {
//         const destinationLocation = results[0].geometry.location;
//         setDestination(destinationLocation);
//       }
//     });
//   }, [map]);

//   useEffect(() => {
//     if (!map || !source || !destination) return;

//     const directionsService = new window.google.maps.DirectionsService();
//     const renderer = new window.google.maps.DirectionsRenderer();

//     const request = {
//       origin: source,
//       destination: destination,
//       travelMode: 'DRIVING',
//     };

//     directionsService.route(request, (response, status) => {
//       if (status === 'OK') {
//         renderer.setDirections(response);
//         renderer.setMap(map);

//         const leg = response.routes[0].legs[0];
//         const routeInfo = {
//           distance: leg.distance.text,
//           duration: leg.duration.text,
//           steps: leg.steps.map(step => ({
//             instruction: step.instructions,
//             roadNumber: step.road
//           })),
//         };

//         displayRouteInfo(routeInfo, leg.start_address, leg.end_address);
//       }
//     });

//     setDirectionsDisplay(renderer);
//   }, [map, source, destination]);

//   const initGoogleMap = () => {
//     return new window.google.maps.Map(googleMapRef.current, {
//       center: new window.google.maps.LatLng(37.7699298, -122.4469157),
//       zoom: 8,
//     });
//   };

//   const displayRouteInfo = (routeInfo, startAddress, endAddress) => {
//     const infowindow = new window.google.maps.InfoWindow({
//       content: `
//         <div>
//           <strong>Start Address:</strong> ${startAddress}<br>
//           <strong>End Address:</strong> ${endAddress}<br>
//           <strong>Distance:</strong> ${routeInfo.distance}<br>
//           <strong>Duration:</strong> ${routeInfo.duration}<br><br>
//           <strong>Route Instructions:</strong><br>
//           ${routeInfo.steps.map((step, index) => `${index + 1}. ${step.instruction} (${step.roadNumber})<br>`).join('')}
//         </div>
//       `,
//     });

//     infowindow.open(map, directionsDisplay.getDirections().routes[0].legs[0].start_location);
//   };

//   return <div ref={google
