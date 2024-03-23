const Person = ({name, number, id, handleDelete}) => {
  console.log(name, id);
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button onClick={() => handleDelete(id)}>Delete</button></td>
    </tr>
  )
};

const PersonListing = ({persons, handleDelete}) => {
  return (
    <table>
      <tbody>
        {persons.map(({name, number, id}) => {
          <Person
            key={id}
            name={name}
            id={id}
            number={number}
            handleDelete={handleDelete}
          />
          })
        }
      </tbody>
    </table>
  )
};

export default PersonListing;
