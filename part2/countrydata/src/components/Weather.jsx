const Weather = ({currentWeather, capital}) => {
  const temp = currentWeather.main.temp;
  const icon = currentWeather.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const wind = currentWeather.wind.speed;

  return (
    <>
      <h2>Current Weather in {capital}</h2>
      <p>Temperature: {temp} Celcius</p>
      <img src={iconURL} />
      <p>Wind: {wind} m/s</p>
    </>
  )
}

export default Weather;
