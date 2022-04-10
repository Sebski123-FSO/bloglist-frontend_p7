import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/blogReducer";

const UserStatus = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("blogListSavedUser");
    dispatch(setUser(null));
  };

  if (user === null) {
    return null;
  } else {
    return (
      <div style={{ display: "inline" }}>
        <p style={{ display: "inline" }}>User {user.name} logged in </p>
        <button onClick={logout}>logout</button>
      </div>
    );
  }
};

export default UserStatus;
