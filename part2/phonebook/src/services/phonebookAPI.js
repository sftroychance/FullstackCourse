import axios from 'axios';
// const baseURL = 'http://localhost:3001/api/persons';
const baseURL = '/api/persons'

const getList = () => {
  return axios
    .get(baseURL)
    .then(response => response.data)
}

const addPerson = (newPerson) => {
  return axios
    .post(baseURL, newPerson)
    .then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
  return axios
    .put(`${baseURL}/${id}`, updatedPerson)
    .then(response => response.data)
}

const deletePerson = (id) => {
  return axios
    .delete(`${baseURL}/${id}`)
    .then(response => response.data)
}

export default {getList, addPerson, updatePerson, deletePerson}
