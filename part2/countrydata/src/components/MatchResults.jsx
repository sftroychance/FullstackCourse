const ResultLine = ({countryName, handleShowDetail}) => {
  return (
    <li>
      {countryName} <button onClick={() => handleShowDetail(countryName)}>Show</button>
    </li>
  )
}

const MatchResults = ({searchResult, handleShowDetail}) => {
  if (!searchResult) {
    return;
  }

  if (searchResult.length === 0) {
    return (
      <>
        <p>Too many matches. Specify another filter.</p>
      </>
    )
  } else {
    return (
      <div className='resultList'>
        <ul>
          {searchResult.map(result => <ResultLine key={result} countryName={result} handleShowDetail={handleShowDetail}/>)}
        </ul>
      </div>
    )
  }
}

export default MatchResults;
