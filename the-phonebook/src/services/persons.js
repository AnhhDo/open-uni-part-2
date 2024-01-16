import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id,updatedObject) => {
    return axios.put(`${baseUrl}/${id}`,updatedObject)
};

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personServices = {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson,
};
export default personServices;
