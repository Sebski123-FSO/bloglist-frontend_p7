import axios from "axios";
const baseUrl = "/api/blogs/";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newNote, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

const updateLikes = async (id, likes) => {
  const response = await axios.put(`${baseUrl}${id}`, { likes });
  return response.data;
};

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}${id}`, config);
  return response.data;
};

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}${blogId}/comments`, {
    content: comment,
  });
  return response.data;
};

export default { getAll, create, updateLikes, deleteBlog, addComment };
