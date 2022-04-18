import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAllUsers, setTitle } from "../reducers/blogReducer";
import usersService from "../services/users";

const UsersInfo = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle("Users"));
  }, []);

  useEffect(async () => {
    const allBlogs = await usersService.getAll();
    dispatch(setAllUsers(allBlogs));
  }, []);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Username</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersInfo;
