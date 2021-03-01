import PropTypes from "prop-types";

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

reducer.propTypes = {
  state: PropTypes.node,
  action: PropTypes.node,
};

export default reducer;
