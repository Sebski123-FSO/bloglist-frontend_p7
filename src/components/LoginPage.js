import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></Form.Control>

        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></Form.Control>
        <Button id="submitBtn" variant="primary" type="submit">
          Login
        </Button>
      </Form.Group>
    </Form>
  );
};

LoginPage.propTypes = {
  createNotification: PropTypes.func.isRequired,
};

export default LoginPage;
