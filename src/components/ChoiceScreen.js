import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { getCop } from "../helpers/utility";

function ChoiceScreen({ gameState, setGameState }) {
  const [choices, setChoices] = useState({
    cop1: {
      city: null,
      vehicle: null,
    },
    cop2: {
      city: null,
      vehicle: null,
    },
    cop3: {
      city: null,
      vehicle: null,
    },
  });
  const [cop, setCop] = useState(null);
  const [cops, setCops] = useState([1, 2, 3]);
  const [cities, setCities] = useState(gameState != null && gameState.gameState != null ? gameState.gameState.cities : []);
  const [city, setCity] = useState(null);
  const [vehicles, setVehicles] = useState(gameState != null && gameState.gameState != null ? gameState.gameState.vehicles : []);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    setCities(gameState != null && gameState.gameState != null ? gameState.gameState.cities : []);
    setVehicles(gameState != null && gameState.gameState != null ? gameState.gameState.vehicles : []);
  }, [gameState]);

  // console.log('cities', cities, gameState != null && gameState.gameState != null ? gameState.gameState.vehicles : [])

  function handleCopSelect(id) {
    setCop(id)
  }

  function handleCitySelect(uid) {
    setCity(uid);
  }

  function handleVehicleSelect(uid) {
    const choice = {...choices};
    choice[`cop${cop}`] = {
      city: city,
      vehicle: uid,
    }
    setChoices(choice);
    setCops(cops.filter(el => el != cop));
    setCop(null)
    setCities(cities.filter(el => el.uid != city));
    setCity(null);
    const newVehicles = [...vehicles];
    for (let i = 0; i < newVehicles.length; i++) {
      if (newVehicles[i].uid == uid) {
        newVehicles[i].count--;
        if (newVehicles[i].count === 0) {
          newVehicles.splice(i, 1);
        }
      }
    }
    setVehicles(newVehicles);
  }

  function handleSearchClick() {
    axios
      .post(`https://thief-hunt-naman.onrender.com/api/searchCriminal`, { choices: choices })
      .then((res) => {
        if (res.data.success) {
          const newGameState = {...gameState};
          newGameState.state = 2
          newGameState["criminalFound"] = res.data.criminalFound;
          newGameState["cop"] = res.data.cop;
          newGameState["city"] = choices[`cop${cop}`];
          setGameState(newGameState);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  if (cops == null || cops.length == 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: "100%", justifyContent: 'space-between', margin: "0.5rem" }}>
        <div style={{ display: "flex", width: '100%', justifyContent: "space-between" }}>
        {
          Object.keys(choices).map((el) => {
            return (
              <div className="clickable" style={{ width: "30%", background: 'lightblue', borderRadius: "15px", display: "flex", flexDirection: "column" }}>
                <img src={`/cop-${el.split('p')[1]}.png`} width={"90%"} style={{ borderRadius: "15px", marginLeft: "auto", marginRight: "auto", marginTop: "1rem" }} />
              </div>
            );
          })
        }
          
        </div>
        <div style={{ marginLeft: 'auto',marginRight: 'auto' }}>
          <Button onClick={handleSearchClick} variant="contained">
            Search
          </Button>
        </div>
      </div>
      
    );
  }

  if (cop != null) {
    return (
      <div style={{ display: "flex", width: '100%', margin: "1rem", gap: '1rem' }}>
        <div style={{ width: "40%" }}>
          <img src={`/cop-${cop}.png`} width={"100%"} style={{ borderRadius: "15px", marginLeft: "auto", marginRight: "auto" }} />
        </div>
        <hr/>
        <div style={{ width: "60%", display: 'flex', flexDirection: 'column', gap: "1rem", textAlign: "center" }}>
          {
            city == null
             ? <p>Select city to seacrh in</p>
             : <p>Select vehicle</p>
          }
          {
            city != null
              ? vehicles.map((el) => {
                return (
                  <div onClick={() => handleVehicleSelect(el.uid)} className="clickable" style={{ display: "flex", gap: '1rem', width: "100%", height: "120px", backgroundColor: "RGB(108, 180, 238, 0.4)", borderRadius: "15px", padding: "0.2rem" }}>
                    <img src={`/${el.name.toLowerCase()}.png`} height={"100%"} style={{ borderRadius: "15px" }} />
                    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                      <div>
                        <b style={{ margin: "0" }}>{el.name}</b>
                        <p style={{ margin: "0" }}>{el.range} KM</p>
                        <p style={{ margin: "0" }}>{el.count}</p>
                      </div>
                    </div>
                  </div>
                );
              })
              : cities.map((el) => {
                  return (
                    <div onClick={() => handleCitySelect(el.uid)} className="clickable" style={{ display: "flex", gap: '1rem', width: "100%", height: "120px", backgroundColor: "RGB(108, 180, 238, 0.4)", borderRadius: "15px", padding: "0.2rem" }}>
                      <img src={`/${el.name.toLowerCase()}.png`} height={"100%"} style={{ borderRadius: "15px" }} />
                      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                        <div>
                          <b style={{ margin: "0" }}>{el.name}</b>
                          <p style={{ margin: "0" }}>{el.knownAs}</p>
                          <p style={{ margin: "0" }}>{el.distance} KM</p>
                        </div>
                        <div>
                          <p>{el.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: '100%', textAlign: "center", gap: "0.1rem" }}>
      <p style={{ fontSize: "22px" }}>select an officer</p>
      <div style={{ display: "flex", width: '100%', justifyContent: "space-evenly" }}>
        {
          cops.map((el) => {
            return (
              <div className="clickable card-wrapper" onClick={() => handleCopSelect(el)}>
      
                <div class="card">
                  
                  <div class="card-image">
                    <img src={`/cop-${el}.png`} width={"100%"} height={"480px"} />
                  </div>

                  <div class="details">
                    <h2>{getCop(el).name}
                      <br />
                      <span class="job-title"><b>{getCop(el).rank}</b></span>
                    </h2>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
    
  );
}

export default ChoiceScreen;