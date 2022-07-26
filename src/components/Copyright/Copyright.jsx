import { Link, Typography } from "@mui/material";
import React from "react";

function Copyright(props) {
  return (
    <Typography
      color="text.secondary"
      align="center"
      {...props}
      variant="body2"
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Covid-19 Tracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
