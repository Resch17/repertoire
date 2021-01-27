import React, { useState, createContext } from 'react';

export const SetlistContext = createContext();

export const SetlistProvider = (props) => {
  const [setlists, setSetlists] = useState([]);

  const getSetlists = () => {
    return fetch('http://localhost:8088/setlists')
      .then((res) => res.json())
      .then(setSetlists);
  };

  return (
    <SetlistContext.Provider value={{ setlists, getSetlists }}>
      {props.children}
    </SetlistContext.Provider>
  );
};
