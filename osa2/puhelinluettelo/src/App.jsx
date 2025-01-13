import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import personsService from './services/persons'
import Notification from './components/Notiflication'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState('success')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const hook = () => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(hook, [])

  const changeNumberof = () => {
    const person = persons.find(p => p.name === newName)
    const changedNumber = { ...person, number: newNumber}
    console.log(`start change number. person: ${changedNumber.name}, ${person.number} -> ${changedNumber.number}`)

    personsService
      .update(person.id, changedNumber)
        .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))

        setMessage(`Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`)
          setTimeout(() => {          
            setMessage(null)        
          }, 5000)
        setNewNumber('')
        setNewName('')
        })
        .catch(error => {
          setStyle('fail')
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {          
            setMessage(null) 
            setStyle('success')       
          }, 5000)
        })


  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        changeNumberof()
      }
    } else {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {          
            setMessage(null)        
          }, 5000)
          setNewNumber('')
          setNewName('')
      })
      .catch(error => {
        console.log(error.response.data)
        setStyle('fail')
        setMessage(error.response.data.error)
        setTimeout(() => {          
          setMessage(null) 
          setStyle('success')       
        }, 5000)
      })

  }}

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
        .removePerson(id)
      setPersons(persons.filter(p => p.id !== id))
      setMessage(`removed ${name}`)
      setTimeout(() => {          
        setMessage(null)        
      }, 5000)
    }
  }

  const namesToShow = 
  persons.filter(person => 
          person.name.toUpperCase()
                      .includes(filter.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style}/>
      <FilterForm handler={handleFilterChange} />


      <h2>Add new: </h2>
      <AddPersonForm 
        add={addPerson} 
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={namesToShow} removePerson={removePerson}/>

    </div>
  )

}

export default App