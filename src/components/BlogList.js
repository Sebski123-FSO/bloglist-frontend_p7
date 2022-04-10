import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlogs, setTitle } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const blogEntryStyle = {
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const BlogList = ({ createNotification }) => {
  const togglableRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const orderedBlogs = state.blogs.sort((a, b) => b.likes - a.likes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle("Blogs"));
  }, []);

  useEffect(async () => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  }, []);

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

  return (
    <>
      <Togglable revealText="new blog" ref={togglableRef}>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <div id="content">
        {orderedBlogs.map((blog) => (
          <div
            key={blog.id}
            style={blogEntryStyle}
            onClick={() => navigate(`/blogs/${blog.id}`)}
          >
            <h3>
              {blog.title} {blog.author}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

BlogList.propTypes = {
  createNotification: PropTypes.func.isRequired,
};

export default BlogList;
