const Person = ({name, number}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
};

const PersonListing = ({persons}) => {
  return (
    <table>
      <tbody>
        {persons.map(({name, number}) => <Person key={name} name={name} number={number} />)}
      </tbody>
    </table>
  )
};

export default PersonListing;
