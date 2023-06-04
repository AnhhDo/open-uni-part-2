const Filter = ({handleChange}) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={handleChange} />
      </div>
    </form>
  );
};
export default Filter;
