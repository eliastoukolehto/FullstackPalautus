const Person = (props) => {
  return (
    <p>
      {props.name} {props.number} <button
      onClick={props.removePerson}>
        Delete
      </button> 
    </p>
  )
}


const Persons = ({ persons, removePerson }) => {
    return (
        <div>
        {persons.map(person =>
            <Person 
            key={person.name} 
            name={person.name} 
            number={person.number}
            removePerson={() => removePerson(person.id, person.name)}
            />
        )}
        </div>
    )
}

export default Persons