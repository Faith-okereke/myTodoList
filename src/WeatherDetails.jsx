import React from 'react'

export default function WeatherDetails({weather}) {
  // const {location, temperature} =weather
  console.log(weather.location.country)
  return (
    <div>
     {weather && <p>{weather}</p>}
      {/* <p>{temperature}</p> */}
    </div>
  )
}
