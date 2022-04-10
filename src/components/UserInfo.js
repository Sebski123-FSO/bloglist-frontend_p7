import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { setAllUsers, setTitle } from "../reducers/blogReducer";
import usersService from "../services/users";

const UserInfo = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const match = useMatch("/users/:id");
  const user = match
    ? allUsers.find((user) => user.id === match.params.id)
    : null;

  useEffect(() => {
    dispatch(setTitle(user ? user.name : "Users"));
  }, [user]);

  useEffect(async () => {
    const allUsers = await usersService.getAll();
    dispatch(setAllUsers(allUsers));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserInfo;
