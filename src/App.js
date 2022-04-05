import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginPage from "./components/LoginPage";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Title from "./components/Title";
import Togglable from "./components/Togglable";
import UserStatus from "./components/UserStatus";
import {
  setBlogs,
  setNotification,
  setTitle,
  setUser,
} from "./reducers/blogReducer";
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const togglableRef = useRef();

  useEffect(async () => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  }, []);

  useEffect(() => {
    const storedUserInfo = window.localStorage.getItem(
      "blogListSavedUser"
    );
    if (storedUserInfo) {
      dispatch(setUser(JSON.parse(storedUserInfo)));
      dispatch(setTitle("Blogs"));
    }
  }, []);

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

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog, state.user.token);

      if (response.user === state.user.id) {
        response.user = {
          id: state.user.id,
          name: state.user.name,
          userName: state.user.userName,
        };
      }

      dispatch(setBlogs(state.blogs.concat(response)));
      togglableRef.current.toggleVisibility();
      createNotification(`blog ${response.title} has been added`);
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id, state.user.token);

      dispatch(setBlogs(state.blogs.filter((blog) => blog.id !== id)));
      createNotification("blog has been deleted");
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  const likeBlog = async (id, likes) => {
    try {
      const response = await blogService.updateLikes(id, likes + 1);
      dispatch(
        setBlogs(
          state.blogs.map((blog) =>
            blog.id === id ? { ...blog, likes: response.likes } : blog
          )
        )
      );
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  const orderedBlogs = state.blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Title title={state.title} />
      {state.notification.message && (
        <Notification notification={state.notification} />
      )}
      {state.user === null ? (
        <LoginPage createNotification={createNotification} />
      ) : (
        <div>
          <UserStatus />
          <Togglable revealText="new blog" ref={togglableRef}>
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
          <div id="content">
            {orderedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={() => likeBlog(blog.id, blog.likes)}
                deleteBlog={() => deleteBlog(blog.id)}
                userName={state.user.userName}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
