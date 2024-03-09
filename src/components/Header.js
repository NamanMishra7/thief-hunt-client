import axios from "axios";
import Button from "@mui/material/Button";
import React from "react";

function Header() {
  function handleReset() {
    axios
      .post(`https://thief-hunt-naman.onrender.com/api/reset`)
      .then((res) => {
        if (res.data.success) {
          window.location.reload()
        }
      })
  }


  return (
    <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', width: "90%", margin: "auto", borderBottom: "1px solid black" }}>
      <div style={{ width: "33%" }}>

      </div>
      <div style={{ textAlign: "center", width: "33%" }}>
        <h2>Thief Hunt</h2>
      </div>
      <div style={{ width: "33%", display: "flex", flexDirection: "row-reverse" }}>
        <Button onClick={handleReset}>
          <b>reset</b>
        </Button>
      </div>
    </div>
  );
}

export default Header;