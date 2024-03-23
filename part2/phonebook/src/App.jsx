import { useState, useEffect } from 'react';
import phonebookAPI from './services/phonebookAPI.js'
import Filter from './components/Filter.jsx';
import NewPerson from './components/NewPerson.jsx';
import PersonListing from './components/PersonListing.jsx';

const App = () => {
  const [persons, setPersons] = useState([])
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

    // attempt to find person in persons array
    // if found, check whether number is the same also
    // if so, alert that the entry already exists
    // otherwise, ask if the number should be updated (phonebookAPI.updatePerson)
    if (persons.map(({name}) => name).includes(newName)) {
      alert(`${newName} is already in the phone book!`);
      return;
    }

    const newPerson = {name: newName, number: newNumber};

    phonebookAPI
      .addPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => alert('error ' + error.message));
  }

  const handleDelete = (targetID) => {
    const {name} = persons.find(({id}) => id === targetID);

    if (confirm(`Delete ${name}?`)) {
      phonebookAPI
        .deletePerson(targetID)
        .then(({id}) => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => alert('error ' + error.message));
    }
  }

  const filteredPersons = persons.filter(({name}) => {
    return name.toLowerCase().match(searchFilter.toLowerCase());
  });

  useEffect(() => {
    phonebookAPI
      .getList()
      .then(listData => {
        console.log(listData)
        setPersons(listData)
      })
      .catch(error => alert('error ' + error.message));
    } , []);

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
      <PersonListing persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
