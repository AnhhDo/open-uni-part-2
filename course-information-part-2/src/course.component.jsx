const Course = ({ course }) => {
  return (
    <div>
      {course.map(({ id, name, parts }) => (
        <div key={id}>
          <h2>{name}</h2>
          {parts.map(({ id, name, exercises }) => (
            <p key={id}>
              {name} {exercises}
            </p>
          ))}
          <h4>
            total of{" "}
            {parts.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.exercises,
              0
            )}{" "}
            exercises
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Course;
