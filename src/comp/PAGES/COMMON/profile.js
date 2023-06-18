import React from 'react'
import Users from '../../SERVICES/UserService';
import { useEffect ,useState} from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
    const data = useSelector(state => state)
    const [users, setUsers] = useState([]);
    useEffect(() => {
      Users.getUsers().then(res=>{
      setUsers(res);});
  }, [])
    return (
        <>
            <h1>Profile</h1>
              <label>id : </label>{data.id}<br/>
              <label>user name  : </label>  {data.userName}<br/>
              <label>user password  : </label> {data.userPassword}<br/>
              <label>user email : </label> {data.userEmail}<br/>
            <h3>all users</h3>
            {users.map(user=>(
        <p key={user.id} >{user.userName}</p>
      ))}
        </>
    )
}

