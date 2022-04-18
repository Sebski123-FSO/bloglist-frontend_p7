import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBlogs, setTitle } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const BlogList = ({ createNotification }) => {
  const togglableRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const orderedBlogs = state.blogs.sort((a, b) => b.likes - a.likes);

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
        <Table striped>
          <tbody>
            {orderedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>
                  <Link to={`/users/${blog.user.id}`}>
                    {blog.user.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

BlogList.propTypes = {
  createNotification: PropTypes.func.isRequired,
};

export default BlogList;
