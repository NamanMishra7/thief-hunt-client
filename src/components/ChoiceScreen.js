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
              
              <div className="card-wrapper">
      
              <div class="card">
                
                <div class="card-image">
                  <img src={`/cop-${el.split('p')[1]}.png`} width={"100%"} height={"480px"} />
                </div>

                <div class="details">
                  <h2 style={{ color: "black" }}>{getCop(el.split('p')[1]).name}
                    <br />
                    <div class="job-title">
                      <b>{getCop(el.split('p')[1]).rank}</b>
                    </div>
                  </h2>
                </div>
              </div>
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
          <h3>
            {
              `${getCop(cop).rank} ${getCop(cop).name}`
            }
          </h3>
        </div>
        <hr/>
        <div style={{ width: "60%", display: 'flex', flexDirection: 'column', gap: "0.5rem", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
          {
            city == null
             ? <b style={{ fontSize: "120%" }}>Select city to seacrh in</b>
             : <b style={{fontSize: "120%" }}>Select vehicle</b>
          }
          <div style={{ marginLeft: "auto" }}>
          <Button onClick={() => setCity(null)} variant="outlined" >
              <b style={{ color: "white" }}>Back</b>
            </Button>
            </div>
            
          </div>
          
          {
            city != null
              ? vehicles.map((el) => {
                return (
                  <div onClick={() => {
                    cities.find(el => el.uid == city).distance * 2 > el.range ? console.log('') :
                    handleVehicleSelect(el.uid)}
                    } className={
                      cities.find(el => el.uid == city).distance * 2 > el.range ? "" : "clickable"
                    } style={{ display: "flex", gap: '1rem', width: "100%", height: "120px",
                    backgroundColor: cities.find(el => el.uid == city).distance * 2 > el.range ? "grey" : "RGB(108, 180, 238, 0.4)",
                    borderRadius: "15px", padding: "0.2rem" }}>
                    <img src={`/${el.name.toLowerCase()}.png`} height={"100%"} style={{ borderRadius: "15px" }} />
                    <div style={{ display: "flex", flexDirection: "row", gap: "1rem", textAlign: "left" }}>
                      <div>
                        <b style={{ margin: "0" }}>{el.name}</b>
                        <p style={{ margin: "0" }}>{el.range} KM</p>
                        <p style={{ margin: "0" }}>{el.count}</p>
                        {
                          cities.find(el => el.uid == city).distance * 2 > el.range && <b > This vehicle wont make it for a round trip!</b>
                        }
                      </div>
                    </div>
                  </div>
                );
              })
              : cities.map((el) => {
                  return (
                    <div onClick={() => handleCitySelect(el.uid)} className="clickable" style={{ display: "flex", gap: '1rem', width: "100%", height: "120px", backgroundColor: "RGB(108, 180, 238, 0.4)", borderRadius: "15px", padding: "0.2rem" }}>
                      <img src={`/${el.name.toLowerCase()}.png`} height={"100%"} style={{ borderRadius: "15px" }} />
                      <div style={{ display: "flex", flexDirection: "row", gap: "1rem", textAlign: "left", width: '100%' }}>
                        <div style={{ width: "30%" }}>
                          <b style={{ margin: "0", fontSize: '120%' }}>{el.name}</b>
                          <p style={{ margin: "0" }}>{el.knownAs}</p>
                          <p style={{ margin: "0" }}>{el.distance} KM</p>
                        </div>
                        <hr/>
                        <div style={{ width: "70%" }}>
                          <b>description</b>
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