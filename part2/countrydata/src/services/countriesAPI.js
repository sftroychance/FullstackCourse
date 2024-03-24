import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getList = () => {
  return axios
    .get(`${baseURL}/all`)
    .then(response => response.data)
}

const getCountryInfo = (name) => {
  return axios
    .get(`${baseURL}/name/${name}`)
    .then(response => response.data)
}

export default {getList, getCountryInfo};
