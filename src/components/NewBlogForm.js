import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");

    createBlog(newBlog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          id="newBlogTitle"
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
          placeholder="Enter title of blog"
        ></input>
      </div>
      <div>
        author:
        <input
          id="newBlogAuthor"
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
          placeholder="Enter author of blog"
        ></input>
      </div>
      <div>
        url
        <input
          id="newBlogUrl"
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
          placeholder="Enter URL of blog"
        ></input>
      </div>
      <button id="newBlogSubmit">create</button>
    </form>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
