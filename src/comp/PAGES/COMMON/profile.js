import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography, Box, TextField, Button } from "@mui/material";

import Users from "../../SERVICES/UserService";

export default function Profile() {
  const data = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Users.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "start",
        magin: "10px",
        padding: "10px",
      }}
    >
      {data.userPhone}
      <Box style={{ marginTop: "30px" }}>
        <Typography color="primary" variant="h4">
          Profile
        </Typography>
      </Box>
      <Box
        style={{
          margin: "10px",
          padding: "10px",
          width: "400px",
        }}
      >
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            required
            value={data.id}
            onChange={(e) => setUsers({ ...users, id: e.target.value })}
            label="ID:"
          />
        </Box>
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            required
            value={data.userName}
            onChange={(e) => setUsers({ ...users, userName: e.target.value })}
            label="UserName:"
          />
        </Box>
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            required
            value={data.userPassword}
            onChange={(e) =>
              setUsers({ ...users, userPassword: e.target.value })
            }
            label="UserPassword:"
          />
        </Box>
        <Box style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <TextField
            fullWidth
            required
            value={data.userEmail}
            onChange={(e) => setUsers({ ...users, userEmail: e.target.value })}
            label="UserEmail:"
          />
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={() => {}}>
            Save Changes
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
        {/* <Box style={{ display: "flex" }}>
        <Typography color="primary" variant="h6">
          All users:
          {users.map((user) => (
            <Typography key={user.id}>{user.userName}</Typography>
          ))}
        </Typography>
      </Box> */}
      </Box>
    </Box>
  );
}
