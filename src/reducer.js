export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        //   let everything inside ...state but add more user:action.user
        ...state,
        user: action.user,
      };

    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
