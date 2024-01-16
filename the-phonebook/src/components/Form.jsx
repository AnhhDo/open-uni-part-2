const Form = ({
  addNewPerson,
  setFilteredPerson,
  newPerson,
  setNewPerson,
  persons,
}) => {
  const handleNameChange = (event) => {
    setNewPerson({
      ...newPerson,
      newName: event.target.value,
    });
  };

  const handleNumberChange = (event) => {
    setNewPerson({
      ...newPerson,
      newNumber: event.target.value,
    });
  };

  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newPerson.newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newPerson.newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={() => setFilteredPerson(persons)}>
          add
        </button>
      </div>
    </form>
  );
};
export default Form;
