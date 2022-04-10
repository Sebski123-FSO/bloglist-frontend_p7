import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllUsers, setTitle } from "../reducers/blogReducer";
import usersService from "../services/users";

const UsersInfo = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle("Users"));
  }, []);

  useEffect(async () => {
    const allBlogs = await usersService.getAll();
    dispatch(setAllUsers(allBlogs));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => (
          <tr key={user.id}>
            <td onClick={() => navigate(`/users/${user.id}`)}>
              {user.name}
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersInfo;
