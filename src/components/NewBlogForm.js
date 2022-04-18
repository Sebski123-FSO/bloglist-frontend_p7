import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <Form onSubmit={handleSubmit} style={{ margin: 10 }}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          id="newBlogTitle"
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
          placeholder="Enter title of blog"
        ></Form.Control>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          id="newBlogAuthor"
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
          placeholder="Enter author of blog"
        ></Form.Control>
        <Form.Label>Url:</Form.Label>
        <Form.Control
          type="text"
          id="newBlogUrl"
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
          placeholder="Enter URL of blog"
        ></Form.Control>
        <Button id="newBlogSubmit" style={{ marginTop: 10 }}>
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
