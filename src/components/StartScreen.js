import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function StartScreen({ gameState, setGameState }) {
  function handleStartClick() {
    const newGameState = {...gameState};
    newGameState.state = 1
    setGameState(newGameState);
    axios
      .put(`https://thief-hunt-naman.onrender.com/api/gameState`, { gameState: newGameState })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div style={{ width: '100%', borderRadius: '15px', width: "100%", display: "flex", justifyContent: "center",  backgroundImage: "url(start.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
      <div style={{ margin: "auto" }}>
        <Button variant="contained" onClick={handleStartClick}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default StartScreen;