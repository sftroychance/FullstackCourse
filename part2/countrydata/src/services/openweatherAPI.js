import axios from 'axios';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';

const getCurrentWeather = (lat, lon) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;

  const URL = `${weatherURL}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  return axios
    .get(URL)
    .then(response => response.data)
}

export default getCurrentWeather;
