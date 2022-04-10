import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTitle, setUser } from "../reducers/blogReducer";
import loginService from "../services/login";

const LoginPage = ({ createNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserInfo = window.localStorage.getItem(
      "blogListSavedUser"
    );
    if (storedUserInfo) {
      dispatch(setUser(JSON.parse(storedUserInfo)));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    } else {
      dispatch(setTitle("Log in to application"));
    }
    return () => {
      setUsername("");
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login(username, password);
      console.log(response);
      window.localStorage.setItem(
        "blogListSavedUser",
        JSON.stringify(response)
      );
      dispatch(setUser(response));
      setUsername("");
      setPassword("");
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        Password:
        <input
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button id="submitBtn">Submit</button>
    </form>
  );
};

LoginPage.propTypes = {
  createNotification: PropTypes.func.isRequired,
};

export default LoginPage;
