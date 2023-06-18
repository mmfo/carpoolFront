import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../PAGES/COMMON/home'
import Login from '../PAGES/COMMON/login'
import SignUp from '../PAGES/COMMON/signUp'
import NavBar from './navBar'
import Profile from '../PAGES/COMMON/profile'
import AddTravel from '../PAGES/DRIVER/addTravel'
import DriverTravel from '../PAGES/DRIVER/driverTravel'
import PassengerTravel from '../PAGES/PASSENGER/passengerTravel'
import TravelSearch from '../PAGES/PASSENGER/travelSearch'
import ButtonAppBar from './appBar'
import FoundTravel from '../PAGES/PASSENGER/foundTravel'

export default function Router() {
    return (
        <BrowserRouter>
        <ButtonAppBar></ButtonAppBar>
            {/* <NavBar></NavBar> */}
            <Routes>
                {/* COMMON */}
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>                             
                {/* DRIVER  */}
                <Route path='/addTravel' element={<AddTravel/>}></Route>                             
                <Route path='/driverTravel' element={<DriverTravel/>}></Route>                             
                {/* PASSENGER */}
                <Route path='/passengerTravel' element={<PassengerTravel/>}></Route>                             
                <Route path='/travelSearch' element={<TravelSearch/>}></Route>                             
                <Route path='/travelSearch/:Id' element={<FoundTravel/>}></Route>                             

            </Routes>
        </BrowserRouter>
    )
}