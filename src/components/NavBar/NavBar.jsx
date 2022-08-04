import { Coronavirus, Login } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut } from "firebase/auth";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

export default function MenuAppBar() {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="error">
        <Toolbar>
          <Coronavirus
            fontSize="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, cursor: "pointer" }}
            onClick={() => navigate("/")}
          ></Coronavirus>
          <Typography
            variant="body2"
            onClick={() => navigate("/")}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            COVID-19 TRACKER
          </Typography>
          <Button onClick={() => navigate("/review")} color="inherit">
            Review
          </Button>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user?.photoURL} />
                <Typography display={{ xs: "none" }}>
                  {user?.displayName}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              color="inherit"
              startIcon={<Login />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
