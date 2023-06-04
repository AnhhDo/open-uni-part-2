const Person = ({ person, deletePerson }) => {
  const { name, number, id } = person;
  return (
    <div>
      <p key={id}>{name} {number}</p> <button onClick={deletePerson}>delete</button>
    </div>
  );
};

export default Person;
