import React, { useEffect, useState } from "react";

import StartScreen from "./StartScreen";
import ChoiceScreen from "./ChoiceScreen";
import ResultScreen from "./ResultScreen";

import axios from "axios";
import Loading from "./Loading";

function GameWindow() {
  const [gameState, setGameState] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(process.env, "process.env")

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://thief-hunt-naman.onrender.com/api/gameState`)
      .then((res) => {
        if (res.data.success) {
          setGameState(res.data.gameState);
          setLoading(false);
        } else {
          console.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <div style={{ display: "flex", width: "90%", minHeight: "620px", justifyContent: "center", borderRadius: "15px", margin: "auto" }}>
      {
        loading ? <Loading />
        :
        gameState != null && gameState.state === 0
          ? <StartScreen gameState={gameState} setGameState={setGameState} />
          : gameState != null && gameState.state === 1
            ? <ChoiceScreen gameState={gameState} setGameState={setGameState} />
            : <ResultScreen gameState={gameState} setGameState={setGameState} />
      }
    </div>
  );
}

export default GameWindow;