import { createContext, useContext, useReducer } from "react";

// Datalayer preparation and where the datalayer placed(lives)
export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// To pull information from datalayer
export const useStateValue = () => useContext(StateContext);
