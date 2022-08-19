import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const apiKey = "e491fd434a734b23837c413b4272349f";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiUrl)
      .then((res) => {
        // console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };



  const handleChangeInput = (e) => {
    // console.log(e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="App">
      <div className="col-md-12">
        <div className="weather_background">
          <h1 className="heading">Real Time Weather React App</h1>
          <div className="d-grid gap-3 col-4 mt-4">
            <input
              type="text"
              className="form-control"
              value={inputCity}
              onChange={handleChangeInput}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png"
            />
            {Object.keys(data).length > 0 && 
            <div>
            <h4 className="weatherCity">{data?.name}</h4>
            <h5 className="weatherTemp">
              {(data?.main?.temp - 273.15).toFixed(2)}°C
            </h5>
              <div className="d-flex gap-4 weatherMinMaxTemp">
                  <h6>Min Temp - {(data?.main?.temp_min - 273.15).toFixed(2)}°C</h6>
                  <h6>Max Temp - {(data?.main?.temp_max - 273.15).toFixed(2)}°C</h6>
              </div>
            </div>
            }
          </div>
        </div>
      
    </div>
  );
}

export default App;
