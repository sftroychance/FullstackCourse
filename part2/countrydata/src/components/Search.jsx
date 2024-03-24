const Search = ({value, handleSearch}) => {
  return (
    <div>
      Find Country: <input type='text' value={value} onChange={handleSearch} />
    </div>
  )
}

export default Search;
