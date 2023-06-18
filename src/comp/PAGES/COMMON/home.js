import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { Button } from '@mui/material'

export default function Home() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Home</h1>
            <section>
                <div>
                    <h2>driver</h2>
                    <button onClick={() =>navigate('/addTravel') }>addTravel</button>        
                    <button onClick={() =>navigate('/driverTravel') }>driverTravel</button> 
                    <h2>passenger</h2>
                    <button onClick={() =>navigate('/passengerTravel') }>passengerTravel</button>        
                    <button onClick={() =>navigate('/travelSearch') }>travelSearch</button>        
                </div>
            </section>
        </>
    )
}

