import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import Form from "./components/Form";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ newName: "", newNumber: "" });
  const [filteredPerson, setFilteredPerson] = useState(persons);

  useEffect(() => {
    personServices.getAll().then((response) => {
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
      name: newPerson.newName,
      number: newPerson.newNumber,
      id: newPerson.newName,
    };

    const personIsAdded = persons.find(
      ({ name }) => name === newPerson.newName
    );
    console.log(persons.find(({ name }) => name === newPerson.newName));

    if (personIsAdded) {
      const message = `${personObject.name} is already added to the phonebook, replace old number with a new one?`;
      if (window.confirm(message) === true) {
        const updatedPerson = {
          ...personIsAdded,
          number: personObject.number,
        }
        const updatedId=personIsAdded.id
        personServices.update(updatedId,updatedPerson)
        .then(response => {
          setPersons(persons.map(person=> person.id!==updatedId ? person : response.data))
        })
      }
    } else {
      personServices.create(personObject).then((response) => {
        console.log(response);
        setPersons(persons.concat(response.data));
      });
      setNewPerson({ newName: "", newNumber: "" });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const message = `Delete ${person.name}`;
    if (window.confirm(message) === true) {
      personServices.deletePerson(id).then((response) => {
        personServices.getAll().then((response) => setPersons(response.data));
      });
    }
  };

  const handleInputChange = (event) => {
    const inputString = event.target.value.toLowerCase();
    const filteredName = persons.filter((person) =>
      person.name.toLowerCase().includes(inputString)
    );
    setFilteredPerson(filteredName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleInputChange}></Filter>
      <h2>add a new</h2>
      <Form
        addNewPerson={addNewPerson}
        setFilteredPerson={setFilteredPerson}
        newPerson={newPerson}
        persons={persons}
        setNewPerson={setNewPerson}
      ></Form>
      <h2>Numbers</h2>
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
