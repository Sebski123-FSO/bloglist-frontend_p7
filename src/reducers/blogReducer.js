const initialState = {
  blogs: [],
  title: "Log in to application",
  user: null,
  notification: {
    message: "",
    err: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        ...state,
        blogs: action.blogs,
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.title,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.notification,
      };
    default:
      return state;
  }
};

export const setBlogs = (blogs) => {
  return {
    type: "SET_BLOGS",
    blogs,
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};

export const setTitle = (title) => {
  return {
    type: "SET_TITLE",
    title,
  };
};

export const setNotification = (notification) => {
  return {
    type: "Set_NOTIFICATION",
    notification,
  };
};

export default reducer;
