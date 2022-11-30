import axios from 'axios'
import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './App.css'
import Loader from './components/Loader'
// import swal from 'sweetalert2'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)

  // Aqui otenemos las cordenadas de la API dl navegador y las montamos en una 

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const newApiSearch = (cityName) => {
    const API_KEY = 'f2023cf649d1d5a5d048b5df13876862'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(url)
      .then(res => setWeather(res.data))
      .catch(error => console.log(error))
  }

  const changeUnitTemperature = () => {
    setIsCelsius(!isCelsius)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //---------------- Peticion de datos a la API del clima-------------------

  useEffect(() => {
    if (coords) {
      const API_KEY = 'f2023cf649d1d5a5d048b5df13876862'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(0)
          const tempFahrenheit = ((tempCelsius * 9 / 5) + 32).toFixed(0)
          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }
          setTemperature(newTemperature)
          setWeather(res.data)
        })

        .catch(error => console.log(error))
    }
  }, [coords])



  return (
    <div className="App">

      {
        weather ? (
          <WeatherCard
            weather={weather}
            temperature={temperature}
            changeUnitTemperature={changeUnitTemperature}
            isCelsius={isCelsius}
            newApiSearch={newApiSearch}

          />

        ) : <Loader />

      }

    </div>
  )
}

export default App
