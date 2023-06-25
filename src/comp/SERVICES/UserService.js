import axios from 'axios';

const httpUser = 'https://localhost:7293/api/User';

const Users = {
    getUsers: async () => {
        var res = await fetch(`${httpUser}/getUsers`)
        if (res.ok) {
            var data = await res.json()
            return data
        }

    },
    updateUser: async (id, user) => {
        let result = await axios.post(`${httpUser}/${id}`, user)
    },
    createUser: async (user) => {
        let result = await fetch(httpUser, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        
        return result.data;
    },
    isEmailExist: async (UserEmail) => {
        let result = await fetch(`${httpUser}/isEmailExist`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UserEmail)
        })        
        return result;
    },
    deleteUser: async (id) => {
        try {
            let res = await axios.delete(`${httpUser}/${id}`)
            if (res.status < 200 || res.status > 299) {
                console.log("can't delete user");
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default Users;
