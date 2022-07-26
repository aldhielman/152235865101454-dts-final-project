import { Facebook, GitHub, Google } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  auth,
} from "../../config/firebase";
import React from "react";

function SocialLogin() {
  const [user] = useAuthState(auth);
  return (
    <Box>
      <Divider>Login With</Divider>
      <Typography>{user?.displayName}</Typography>
      <Box display="flex" justifyContent="center">
        <IconButton
          color="error"
          size="large"
          onClick={signInWithGoogle}
          title="Login With Google Account"
        >
          <Google fontSize="inherit" />
        </IconButton>
        <IconButton
          color="primary"
          size="large"
          onClick={signInWithFacebook}
          title="Login With Faecebook Account"
        >
          <Facebook fontSize="inherit" />
        </IconButton>
        <IconButton
          sx={{ color: "#000000" }}
          size="large"
          onClick={signInWithGithub}
          title="Login With Github Account"
        >
          <GitHub fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SocialLogin;
