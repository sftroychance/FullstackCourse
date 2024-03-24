import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search.jsx';
import MatchResults from './components/MatchResults.jsx';
import CountryDetails from './components/CountryDetails.jsx';
import countriesAPI from './services/countriesAPI.js';
import getCurrentWeather from './services/openweatherAPI.js';


function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setSearchResult(null);

    if (!e.target.value) {
      return;
    }

    const results = countryList.filter(name => {
      return name.toLowerCase().match(e.target.value.toLowerCase())
    });

    const result = results.length === 1 ? results.at(0) : null;

    if (selectedCountry && result === selectedCountry.name.official) {
      return;
    }

    setSelectedCountry(null);

    if (results.length === 0) {
      setSearchResult(null);
    } else if (results.length > 10) {
      setSearchResult([]);
    } else if (results.length > 1) {
      setSearchResult(results);
    } else {
      setSearchResult(null);
      getCountryDetails(result);
    }
  }

  const getCountryDetails = (countryName) => {
    let countryInfo;
    countriesAPI
        .getCountryInfo(countryName)
        .then(info => {
          countryInfo = info;
          return info.capitalInfo.latlng
        })
        .then(([lat, lon]) => getCurrentWeather(lat, lon))
        .then(weather => {
          setSelectedCountry(countryInfo);
          setCurrentWeather(weather);
        })
        .catch(error => alert(`API Error: ${error.message}`);
  }

  useEffect(() => {
    countriesAPI
      .getList()
      .then(data => {
        const countries = data.map(({name: {official}}) => official);
        setCountryList(countries);
      })
      .catch(error => {
        alert(`Error retrieving data: ${error.message}`);
      });
  }, []);

  return (
    <>
      <Search handleSearch={handleSearch} value={searchText} />
      <MatchResults searchResult={searchResult} handleShowDetail={getCountryDetails}/>
      <CountryDetails selectedCountry={selectedCountry} currentWeather={currentWeather} />
    </>
  )
}

export default App
