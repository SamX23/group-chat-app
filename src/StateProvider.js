import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

// Datalayer preparation and where the datalayer placed(lives)
export const StateContext = createContext();

// Higher order component
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {/* children = App */}
    {children}
  </StateContext.Provider>
);

// To pull information from datalayer
export const useStateValue = () => useContext(StateContext);

StateProvider.propTypes = {
  reducer: PropTypes.string,
  initialState: PropTypes.string,
  children: PropTypes.element.isRequired,
};
