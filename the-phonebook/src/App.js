import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPerson, setFilteredPerson] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  // runs only when the app is first rendered

  useEffect(() => {
    setFilteredPerson(persons);
  }, [persons]);
  // runs everytime the value of persons change

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    };

    const isAdded = persons.find(({ name }) => name === newName);
    console.log(persons.find(({ name }) => name === newName));

    if (isAdded) {
      alert(`${personObject.name} is already added to the phonebook`);
    } else {
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          console.log(response);
          setPersons(persons.concat(response.data));
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const person = persons.find((p) => p.id === id)
    const message =`Delete ${person.name}`
    if(window.confirm(message) === true){
      axios.delete(url).then((response) => {
        axios.get("http://localhost:3001/persons").then((response) => setPersons(response.data))
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleInputChange = (event) => {
    const inputString = event.target.value.toLowerCase();
    const filteredName = persons.filter((person) =>
      person.name.toLowerCase().includes(inputString)
    );
    setFilteredPerson(filteredName);
    console.log(filteredName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleInputChange}></Filter>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* <PersonList persons={filteredPerson}></PersonList> */}
      <ul>
        {filteredPerson.map((person) => (
          <Person
            person={person}
            key={person.id}
            deletePerson={() => deletePerson(person.id)}
          ></Person>
        ))}
      </ul>
    </div>
  );
};

export default App;
