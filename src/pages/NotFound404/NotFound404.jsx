import React from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Error 404 - Page Not Found</h1>
      <Link to="/" style={{ textDecoration: "none", color: "red" }}>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
