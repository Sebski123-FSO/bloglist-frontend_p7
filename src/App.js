import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import Title from "./components/Title";
import UserInfo from "./components/UserInfo";
import UsersInfo from "./components/UsersInfo";
import { setNotification } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const createNotification = (message, isError = false, uptime = 3000) => {
    dispatch(
      setNotification({
        message,
        err: isError,
      })
    );
    setTimeout(() => {
      dispatch(setNotification({ message: "", err: true }));
    }, uptime);
  };

  return (
    <>
      <NavBar />
      <Title title={state.title} />
      {state.notification.message && <Notification />}
      {state.user === null ? (
        <LoginPage createNotification={createNotification} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<BlogList createNotification={createNotification} />}
          />
          <Route path="/users" element={<UsersInfo />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route
            path="/blogs"
            element={<BlogList createNotification={createNotification} />}
          />
          <Route
            path="/blogs/:id"
            element={<Blog createNotification={createNotification} />}
          />
          <Route
            path="/login"
            element={<LoginPage createNotification={createNotification} />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
