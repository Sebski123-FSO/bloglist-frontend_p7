import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setUser } from "../reducers/blogReducer";

const UserStatus = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("blogListSavedUser");
    dispatch(setUser(null));
    dispatch(setTitle("Log in to application"));
  };
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <p>User {user.name} logged in</p>
          </td>
          <td>
            <button onClick={logout}>logout</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserStatus;
