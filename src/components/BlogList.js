import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, setTitle } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const BlogList = ({ createNotification }) => {
  const togglableRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Blogs"));
  }, []);

  useEffect(async () => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  }, []);

  const state = useSelector((state) => state);

  const orderedBlogs = state.blogs.sort((a, b) => b.likes - a.likes);

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

  return (
    <>
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
    </>
  );
};

BlogList.propTypes = {
  createNotification: PropTypes.func.isRequired,
};

export default BlogList;
