import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'

const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')
  const [ show, setShow] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
        setShow(data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name === newName).length > 0){
      alert(`${newName} is already in phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setShow(persons)
        setSearch('')
        setNewName('')
        setNewNumber('')
      })


    }
  }

  function findName(person) { 
    //console.log(person.name , search, person.name === search)
    return person.name === search;
  }

  const searching = (event) => {  
    event.preventDefault()
    if (search !== ''){
      let result = persons.find(findName)
      //console.log(result)
      setShow(result === undefined ? [] : [result])
    } else {
      setShow(persons)
    }
    setSearch('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter submit={searching} search={search} handler={handleSearchChange}/>
      <h3>Add a new Person</h3>
      <PersonForm submit={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>
      <Persons show={show} persons={persons} setShow={setShow} setPersons={setPersons}/>
    </div>
  )
}



const Number = (props) => {
  //console.log('Number',props)
  return (
    <div>
      <p>{props.name} {props.number}</p>
      <button onClick={props.delete}>delete</button>
    </div>  
  )
}

const Filter = (props) => {
return (<form onSubmit={props.submit}>
          <div>
            Filter shown with <input value={props.search}
            onChange={props.handler}/>
          </div>
          <div>
            <button type="submit">search</button>
        </div>
      </form>)
}

const PersonForm = (props) => {
  return (<form onSubmit={props.submit}>
    <div>
      name: <input value={props.newName}
      onChange={props.handleNameChange}
      />
    </div>
    <div>
      number: <input value={props.newNumber}
      onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  )
}

const Persons = (props) => {
  const deleteNumber = (id) => {
    const number = props.persons
    number.splice(number.findIndex(p => p.id === id),1)

    personService
    .deleteId(id).then(returnedPerson => {
      console.log(returnedPerson.data)
      props.setPersons(number)
      props.setShow(number)
    })
    .catch(error => {
      alert(
        `the person was already deleted from server`
      )
    })
}
  return(
    <div>
    {props.show.map(person => 
    <Number key={person.id} name={person.name} number={person.number} delete={()=>deleteNumber(person.id)}/>)}
    </div>
  )
}
export default App