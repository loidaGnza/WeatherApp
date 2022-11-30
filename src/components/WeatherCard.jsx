
import React, { useState } from 'react';

const WeatherCard = ({ weather, temperature, isCelsius, changeUnitTemperature, newApiSearch }) => {

  const [place, setPlace] = useState('')

  const handleChangePlace = (event) => {
    setPlace(event.target.value)
  }

  return (
    <article className='weatherCard'>

      <input className='weatherCard-input'
        type='text'
        value={place}
        onChange={handleChangePlace}
      />
      <button className='weatherCard-search' onClick={() => newApiSearch(place)}>Search</button>


      <h1 >Weather App</h1>
      <h3>{weather.name}, {weather.sys.country}</h3>

      <section className='.weatherCard-body'>
        <div className='img-animation'>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt='' />
        </div>
        <ul className='weatherCard-list'>
          <li>{weather.weather[0].description}</li>
          <li>Wind speed: {weather.wind.speed} m/s</li>
          <li>Clouds: {weather.clouds.all} %</li>
          <li>Pressure:{weather.main.pressure} hPa</li>
        </ul>
      </section>

      <p>{isCelsius ? `${temperature.celsius} °C` : ` ${temperature.fahrenheit} °F`}</p>
      <button className='weatherCard-button' onClick={changeUnitTemperature}> Degress °F/°C</button>


    </article >

  )
}

export default WeatherCard