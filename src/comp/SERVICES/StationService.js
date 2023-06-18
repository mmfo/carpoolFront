import axios from 'axios';

const httpUser='https://localhost:3000/api/station';

const Station = {
    getStations: async()=>{
        let result = await axios.get(httpUser)
        return result.data;
    },
    getStation: async(id)=>{
        let result= await axios.get(`${httpUser}/${id}`)
        return result.data;
    },
    updateStation: async(id,station)=>{
        let result= await axios.post(`${httpUser}/${id}`,station)
    },
    createStation: async(station)=>{
        let result= await axios.post(httpUser,station)
        //return result.data;
    },
    deleteStation: async(id)=>{
        try{
            let res = await axios.delete(`${httpUser}/${id}`)
            if(res.status<200 || res.status>299){
                console.log("can't delete station");
            }
        }catch(error){
            console.log(error);
        }
    }
}
export default Station;
