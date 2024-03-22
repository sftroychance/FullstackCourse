import { useState } from 'react';
import Filter from './components/Filter.jsx';
import NewPerson from './components/NewPerson.jsx';
import PersonListing from './components/PersonListing.jsx';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '415-407-6633'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const nameHandler = (e) => {
    setNewName(e.target.value);
  }

  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  }

  const filterHandler = (e) => {
    setSearchFilter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.map(({name}) => name).includes(newName)) {
      alert(`${newName} is already in the phone book!`);
      return;
    }

    const newPerson = {name: newName, number: newNumber};
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const filteredPersons = persons.filter(({name}) => {
    return name.toLowerCase().match(searchFilter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={filterHandler} searchFilter={searchFilter} />

      <h2>Add new entry:</h2>
      <NewPerson
        handleSubmit={handleSubmit}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <h2>Numbers</h2>
      <PersonListing persons={filteredPersons} />
    </div>
  )
}

export default App
