import React from "react";
import { Card, Typography, CardContent } from "@mui/material";
import "./InfoBox.css";

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography gutterBottom color="textSecondary">
          {title}
        </Typography>
        <Typography
          fontSize={{ xs: 12, md: 36 }}
          className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}
        >
          {cases}
        </Typography>
        <Typography
          fontSize={{ xs: 12, md: 36 }}
          className="infoBox__total"
          color="textSecondary"
        >
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
