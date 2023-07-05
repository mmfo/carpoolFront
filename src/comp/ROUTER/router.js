import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../PAGES/COMMON/home";
import Login from "../PAGES/COMMON/login";
import SignUp from "../PAGES/COMMON/signUp";
import NavBar from "./navBar";
import Profile from "../PAGES/COMMON/profile";
import AddTravel from "../PAGES/DRIVER/addTravel";
import DriverTravel from "../PAGES/DRIVER/driverTravel";
import PassengerTravel from "../PAGES/PASSENGER/passengerTravel";
import TravelSearch from "../PAGES/PASSENGER/travelSearch";
import ButtonAppBar from "./appBar";
import FoundTravel from "../PAGES/PASSENGER/foundTravel";
import { Button, Box, Typography } from "@mui/material";

export default function Router() {
  return (
    <BrowserRouter>
      <ButtonAppBar />
      <Routes>
        {/* COMMON */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {/* DRIVER  */}
        <Route path="/addTravel" element={<AddTravel />} />
        <Route path="/driverTravel" element={<DriverTravel />} />
        {/* PASSENGER */}
        <Route path="/passengerTravel" element={<PassengerTravel />} />
        <Route path="/travelSearch" element={<TravelSearch />} />
        <Route path="/travelSearch/:Id" element={<FoundTravel />} />
      </Routes>
    </BrowserRouter>
  );
}
