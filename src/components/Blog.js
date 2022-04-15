import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { setBlogs, setTitle } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const Blog = ({ createNotification }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");
  const blog = match
    ? state.blogs.find((blog) => blog.id === match.params.id)
    : null;

  useEffect(() => {
    dispatch(setTitle(blog ? blog.title : "Users"));
  }, [blog]);

  useEffect(async () => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  }, []);

  const handleDeleteBlog = () => {
    if (window.confirm(`Delete note ${blog.title} by ${blog.author}?`)) {
      deleteBlog();
    }
  };

  const likeBlog = async () => {
    const id = blog.id;
    const likes = blog.likes;
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

  const deleteBlog = async () => {
    const id = blog.id;
    try {
      await blogService.deleteBlog(id, state.user.token);

      dispatch(setBlogs(state.blogs.filter((blog) => blog.id !== id)));
      createNotification("blog has been deleted");
      navigate("/");
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  const ownedByUser = state.user.name === blog.user.userName;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <a href={blog.url}>{blog.url}</a>
            </td>
          </tr>
          <tr>
            <td data-testid="likes">
              {blog.likes} likes <button onClick={likeBlog}>like</button>
            </td>
          </tr>
          <tr>
            <td>added by {blog.user.name}</td>
          </tr>
          <tr style={{ display: ownedByUser ? "" : "none" }}>
            <td>
              <button onClick={handleDeleteBlog}>delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: blog.comments.length ? "" : "none" }}>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment) => {
            return <li key={comment}>{comment.content}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

Blog.propTypes = {
  createNotification: PropTypes.func.isRequired,
};

export default Blog;
