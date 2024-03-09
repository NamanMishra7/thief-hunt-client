import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function ResultScreen({ gameState, setGameState }) {
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
    <div style={{ width: '100%', width: "100%", display: "flex", justifyContent: "center" }}>
      <>{JSON.stringify(gameState)}</>
      <>{gameState.criminalFound}</>

      <Button onClick={handleReset} variant="contained">
        Reset
      </Button>
    </div>
  );
}

export default ResultScreen;