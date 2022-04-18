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
      <div>
        <p style={{ display: "inline" }}>{user.name}: </p>
        <u style={{ display: "inline" }} onClick={logout}>
          logout
        </u>
      </div>
    );
  }
};

export default UserStatus;
