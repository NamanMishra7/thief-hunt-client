import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress size={80}/>
    </div>
  );
}

export default Loading;
