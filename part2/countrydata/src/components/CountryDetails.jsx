import Weather from './Weather.jsx';

const CountryDetails = ({selectedCountry, currentWeather}) => {
  if (!selectedCountry) {
    return;
  }

  const {name, capital, area, languages, flags} = selectedCountry;

  return (
    <>
      <h2>{name.official}</h2>
      <p>Capital: {capital.at(0)}</p>
      <p>Area: {area}</p>
      <h3>Languages spoken:</h3>
      <ul>
        {Object.values(languages).map(x => {
          return <li key={x}>{x}</li>
        })}
      </ul>
      <img src={flags.png} />
      <Weather currentWeather={currentWeather} capital={capital} />
    </>
  )
}

export default CountryDetails;
