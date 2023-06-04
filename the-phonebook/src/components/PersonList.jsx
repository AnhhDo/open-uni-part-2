import axios from "axios";
import Person from "./Person";

const PersonList = ({ persons }) => {
  const deleteP = (id) =>{
    const url=`http://localhost:3001/persons/${id}`
    const deletedPerson = {...persons}
    axios
      .delete(url)
      .then((response) =>{
        alert(`${id} is deleted`)
        console.log(response)
  })
    console.log(id)
  }

  return (
    <ul>
      {persons.map((person) => (
        <Person person={person} key={person.id} deletePerson={() => {deleteP(person.id)}}></Person>
      ))}
    </ul>
  );
};
export default PersonList;
