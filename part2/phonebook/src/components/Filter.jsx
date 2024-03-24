const Filter = ({searchFilter, handleSearchFilter}) => {
  return (
    <div>
      Filter shown with: <input value={searchFilter} onChange={handleSearchFilter} />

    </div>
  )
}

export default Filter;
