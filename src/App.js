import hBg from './assets/hot.jpg'
import cBg from './assets/cold.jpg'
import logo from './assets/OpenWeather.jpg'
import WeatherDescriptions from './components/WeatherDescriptions';
import { useEffect, useState } from 'react';
import { getFWeatherData } from './weatherService';

function App() {
  const[city, setCity] = useState('San Diego');
  const [weather, setWeather] = useState(null);
  const [backG, setBg] = useState(hBg);
  const [units, setUnits] = useState ('imperial');

  useEffect (() => {
    const fetchWeatherData = async () => {
    const data = await getFWeatherData(city, units)
    setWeather(data);

    const threshold = units === 'imperial' ? 60 : 16;
    if (data.temp <= threshold) setBg(cBg);
    else setBg(hBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button  = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isFahrenheit = currentUnit === 'F';
    button.innerText = isFahrenheit ? '°C' : '°F';
    setUnits(isFahrenheit ? 'imperial' : 'metric');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };


  return (
    <div className="app" style= {{backgroundImage: `url(${backG})`}}>
      <div className= "encompass">
        {weather && (
            <div className= "container">
          <div className= "section section_inputs">
            <input 
            onKeyDown={enterKeyPressed} 
            type= "text" name= "city" 
            placeholder= "Enter City ..."
            />
            <button onClick= {(e) => handleUnitsClick (e)}>°F</button>
          </div>
            <div className= "section section_temperature">
            <div className= "icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src= {weather.iconURL} 
              alt= "weatherIcon"/>
              <h3>{weather.description}</h3>
            </div>
            <div className= "temperature">
              <h1>{`${weather.temp.toFixed()} °${units ===
              'imperial' ? 'F' : 'C'}`}</h1>
            </div>
          </div>

          <WeatherDescriptions weather={weather} units={units}/>
          <div className= "attribution">
            <img src={logo} alt="" width={20} height={20}/>
            Weather data provided by
            <a href="https://openweathermap.org/">
                OpenWeather
            </a>
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
