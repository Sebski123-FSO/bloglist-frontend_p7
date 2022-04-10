import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notificationState = useSelector((state) => state.notification);

  console.log(notificationState);

  const style = {
    color: notificationState.err ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div id="notification" style={style}>
      {notificationState.message}
    </div>
  );
};

export default Notification;
