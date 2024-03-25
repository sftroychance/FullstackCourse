import { useState, useEffect } from 'react';
import phonebookAPI from './services/phonebookAPI.js'
import Filter from './components/Filter.jsx';
import NewPerson from './components/NewPerson.jsx';
import PersonListing from './components/PersonListing.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSearchFilter = (e) => {
    setSearchFilter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {name: newName, number: newNumber};
    const existingPerson = persons.find(({name}) => name === newName);

    if (existingPerson) {
      updatePerson(existingPerson, newPerson);
    } else {
      addPerson(newPerson);
    }

    setNewName('');
    setNewNumber('');
 }

  const displayStatus = (message, status) => {
    setStatusMessage(message);
    setStatusType(status);

    setTimeout(() => {
      setStatusMessage(null);
      setStatusType(null);
    }, 5000);
  }

  const updatePerson = (existingPerson, newPerson) => {
    if (existingPerson.number === newNumber) {
      const message = `An entry for ${existingPerson.name} already exists.`;
      displayStatus(message, 'error');

      return;
    } else {
      const message = `Do you want to change the number for ${existingPerson.name} from ${existingPerson.number} to ${newNumber}?`;
      if (confirm(message)) {
        phonebookAPI
          .updatePerson(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person));
            displayStatus(`${existingPerson.name} updated.`, 'info');
          })
          .catch(error => {
            if (error.response.status === 404) {
              displayStatus(`${existingPerson.name} was previously deleted.`, 'error');
            } else {
              displayStatus(`Update error: ${error.message}`, 'error');
            }
          });

        return;
      }
    }
  }

  const addPerson = (newPerson) => {
    phonebookAPI
      .addPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        displayStatus(`${addedPerson.name} added.`, 'info');
      })
      .catch(error => {
        displayStatus(`Add record error: ${error.message}`, 'error');
      });
  }

  const handleDelete = (targetID) => {
    const {name} = persons.find(({id}) => id === targetID);

    if (confirm(`Delete ${name}?`)) {
      phonebookAPI
        .deletePerson(targetID)
        .then(response => {
          setPersons(persons.filter(person => person.id !== targetID));
          displayStatus(`${name} deleted.`, 'info');
        })
        .catch(error => {
          if (error.response.status === 404) {
            displayStatus(`${name} was previously deleted.`, 'error');
          } else {
            displayStatus(`Delete error: ${error.message}`, 'error');
          }
        });
    }
  }

  const filteredPersons = persons.filter(({name}) => {
    return name.toLowerCase().match(searchFilter.toLowerCase());
  });

  useEffect(() => {
    phonebookAPI
      .getList()
      .then(listData => {
        setPersons(listData)
      })
      .catch(error => {
        displayStatus(`Data retrieval error: ${error.message}`, 'error');
      });
    } , []);


  return (
    <div>
      <Notification message={statusMessage} status={statusType} />
      <h2>Phonebook</h2>
      <Filter handleSearchFilter={handleSearchFilter}
        searchFilter={searchFilter} />

      <h2>Add new entry:</h2>
      <NewPerson handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonListing persons={filteredPersons} handleDelete={handleDelete} allPersons={persons}/>
    </div>
  )
}

export default App
