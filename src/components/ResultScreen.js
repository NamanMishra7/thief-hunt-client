import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import { getCop } from "../helpers/utility";

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
    <div style={{ width: '100%', width: "100%", display: "flex", flexDirection: 'column', justifyContent: "center" }}>
      <div>
        {
          gameState.criminalFound == true
            ? <div style={{ display: "flex", flexDirection: 'column', width: '100%', justifyContent: 'center', textAlign: 'center' }}>
              <h3>Criminal found by</h3>
              <div className="card-wrapper" style={{ margin: 'auto' }}>
      
              <div class="card">
                
                <div class="card-image">
                  <img src={`/cop-${gameState.cop}.png`} width={"100%"} height={"480px"} />
                </div>

                <div class="details">
                  <h2 style={{ color: "black" }}>{getCop(gameState.cop).name}
                    <br />
                    <div class="job-title">
                      <b>{getCop(gameState.cop).rank}</b>
                    </div>
                  </h2>
                </div>
              </div>
            </div>
            </div>
            : <div style={{ display: "flex", flexDirection: 'column', width: '100%', justifyContent: 'center', textAlign: 'center' }}><h3>Misson Failed</h3></div>
        }
      </div>
      
      <div style={{ margin: 'auto' }}>
      <Button onClick={handleReset} variant="contained">
        Reset
      </Button>
      </div>
      
    </div>
  );
}

export default ResultScreen;