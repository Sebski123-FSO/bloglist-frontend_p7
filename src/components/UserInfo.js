import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setTitle } from "../reducers/blogReducer";
import usersService from "../services/users";

const UserInfo = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

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
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserInfo;
