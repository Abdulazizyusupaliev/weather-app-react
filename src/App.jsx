import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';

export default function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [speed, setSpeed] = useState(null);
  const [dep, setDep] = useState(false);
  const [lat, setLat] = useState(41.311081);
  const [lon, setLon] = useState(69.240562);
  const [bgImage, setBgImage] = useState('https://wallpaperset.com/w/full/3/4/5/189096.jpg');

  const Tashkent = useRef();
  const Andijan = useRef();
  const Bukhara = useRef();
  const Fergana = useRef();
  const Jizzakh = useRef();
  const Namangan = useRef();
  const Navoiy = useRef();
  const Kashkadarya = useRef();
  const Karakalpakstan = useRef();
  const Khorezm = useRef();
  const Samarkand = useRef();
  const Sirdaryo = useRef();
  const wrapper = useRef();

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b4acff7684fa39b7986123455be7bcbc&units=metric`)
      .then((response) => {
        setCurrentWeather(response.data);
        setSpeed(response.data.wind.speed);
        if (response.data.weather && response.data.weather[0].main === 'Rain') {
          setBgImage('https://backlightblog.com/images/2021/11/rain-photography-header-2000x1310.jpg');
        }else if(response.data.weather && response.data.weather[0].main === 'Clear'){
          setBgImage('https://wallpaperaccess.com/full/3265126.jpg');
        }
         else {
          setBgImage('https://wallpaperset.com/w/full/3/4/5/189096.jpg'); // Default background image
        }
      })
      .catch((error) => console.log(error));
  }, [dep, lat, lon]);

  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let day = days[time.getDay()];
  let month = months[time.getMonth()];
  let date = time.getDate();

  const changeRegion = (regionLat, regionLon) => {
    setLon(regionLon);
    setLat(regionLat);
    setDep(!dep);
  };

  return (
    <div className="wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="weather">
        <h4 className="weather__title">The Weather</h4>
        <div className="weather__intro">
          <h1>{Math.floor(currentWeather.main?.temp)}°</h1>
          <div className="weather__location">
            <h2>{currentWeather.name}</h2>
            <p>{hours}:{minutes} - {day}, {date} {month}</p>
          </div>
          <div className="weather__status">
            <img src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0]?.icon}@4x.png`} alt="" />
            <p>{currentWeather.weather?.[0]?.main}</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="search__bar">
          <input type="text" placeholder="Another Location" />
          <button><i className="bi bi-search"></i></button>
        </div>
        <div className="card__intro">
          <div className="uzb__cities">
            <button onClick={() => changeRegion(41.311081, 69.24056)} ref={Tashkent}>Tashkent</button>
            <button onClick={()=>changeRegion(40.782865,72.345154)} ref={Andijan}>Andijan</button> <button onClick={()=>changeRegion(39.775,64.415)} ref={Bukhara}>Bukhara</button> <button onClick={()=>changeRegion(40.358,71.745)} ref={Fergana}>Fergana</button> <button onClick={()=>changeRegion(40.358,71.745)} ref={Jizzakh}>Jizzakh</button> <button onClick={()=>changeRegion(41,71.667)} ref={Namangan}>Namangan</button> <button onClick={()=>changeRegion(40.083,65.367)} ref={Navoiy}>Navoiy</button> <button onClick={()=>changeRegion(39.45,66.8)} ref={Kashkadarya}>Kashkadarya</button> <button onClick={()=>changeRegion(41.5,60)} ref={Karakalpakstan}>Karakalpakstan</button> <button onClick={()=>changeRegion(41,61.5)} ref={Khorezm}>Khorezm</button> <button onClick={()=>changeRegion(39.667,66.833)} ref={Samarkand}>Samarkand</button> <button onClick={()=>changeRegion(40,68)} ref={Sirdaryo}>Sirdaryo</button>
          </div>
          <hr />
          <div className="details">
            <h2>Weather Details</h2>
            <div className="details__intro">
              <div className="info">
                <h4>Cloudy</h4>
                <p>{currentWeather.clouds?.all}</p>
              </div>
              <div className="info">
                <h4>Humidity</h4>
                <p>{currentWeather.main?.humidity}%</p>
              </div>
              <div className="info">
                <h4>Wind</h4>
                <p>{speed !== null ? `${speed} km/h` : 'Loading...'}</p>
              </div>
              <div className="info">
                <h4>Pressure</h4>
                <p>{currentWeather.main?.pressure} Pha</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
