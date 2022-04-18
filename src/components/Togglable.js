import PropTypes from "prop-types";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef(({ revealText, children }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  const showWhenVisible = { display: visible ? "" : "none" };
  const showWhenNotVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={showWhenNotVisible}>
        <Button className="toggleButton" onClick={toggleVisibility}>
          {revealText}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          className="toggleButton"
          variant="danger"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  revealText: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
