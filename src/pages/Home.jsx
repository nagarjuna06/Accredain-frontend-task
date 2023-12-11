import { Grid, Button, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/user.svg";

const Home = () => {
  const [user, setUser] = useState({});
  const router = useNavigate();
  const signOut = () => {
    Cookies.remove("_token");
    router("/signin");
  };
  const loadUser = async () => {
    const token = Cookies.get("_token");
    const response = await fetch("http://localhost:5000", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3} borderRadius={2} padding={2} boxShadow={2}>
        <Stack direction="column" width={350} alignItems="center" fontSize={18}>
          <img src={userImage} width={50} height={50} />
          <p>name: {user?.name}</p>
          <b>username: {user?.username}</b>
          <p>email: {user?.email}</p>
          <Button onClick={signOut} variant="contained">
            Sign Out
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
