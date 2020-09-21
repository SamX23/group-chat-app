export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        //   let everything inside ...state but add more user:action.user
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
