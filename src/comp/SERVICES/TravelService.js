import axios from 'axios';

const httpTravel = 'https://localhost:7293/api/travels';
const Travel = {
    getTravel: async () => {
        let result = await axios.get(httpTravel)
        return result.data;
    },
    getTravel: async (id) => {
        let result = await axios.get(`${httpTravel}/${id}`)
        return result.data;
    },
    updateTravel: async (id, travel) => {
        let result = await axios.post(`${httpTravel}/${id}`, travel)
    },
    createTravel: async (travel) => {
        let result = await axios.post(httpTravel, travel)
        //return result.data;
    },
    deleteTravel: async (id) => {
        try {
            let res = await axios.delete(`${httpTravel}/${id}`)
            if (res.status < 200 || res.status > 299) {
                console.log("can't delete travel");
            }
        } catch (error) {
            console.log(error);
        }
    },
    ///
    getSourceCities: async () => {
        var res = await fetch(`${httpTravel}/getSourceCities`)
        if (res.ok) {
            var data = await res.json()
            return data
        }
    },
    getDestCities: async () => {
        var res = await fetch(`${httpTravel}/getDestCities`)
        if (res.ok) {
            var data = await res.json()
            return data
        }
    },

    TravelSearch: async (travel) => {
        let result = await fetch(`${httpTravel}/searchTravel`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(travel)
        })
        if (result.ok) {
            var data = await result.json()
            return data
        }
    },
    getFutureTravelsByUserId: async (userId) => {
        var res = await fetch(`${httpTravel}/getFutureTravelsByUserId/${userId}`)
        if (res.ok) {
            var data = await res.json()
            return data
        }

    },
    getPastTravelsByUserId: async (userId) => {
        var res = await fetch(`${httpTravel}/getPastTravelsByUserId/${userId}`)
        if (res.ok) {
            var data = await res.json()
            return data
        }

    },
    NevigateRoute: async () => {
        try{
            let result = await fetch(`${httpTravel}/nevigate`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (result.ok) {
                var data = await result.json()
                return data
            }
        }catch(e)
        {
            console.error("error in"+e)
        
        }
        
    }
}
export default Travel;
