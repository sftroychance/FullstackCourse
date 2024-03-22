const NewPerson = (props) => {
  const {handleSubmit, newName, nameHandler, newNumber, numberHandler} = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPerson;
