const Filter = ({searchFilter, filterHandler}) => {
  return (
    <div>
      Filter shown with: <input value={searchFilter} onChange={filterHandler} />
    </div>
  )
}

export default Filter;
