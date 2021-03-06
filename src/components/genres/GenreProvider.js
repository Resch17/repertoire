import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const GenreContext = createContext();

export const GenreProvider = (props) => {
  const [genres, setGenres] = useState([]);

  const getGenres = () => {
    return fetch(`${apiUrl}/genres`)
      .then((res) => res.json())
      .then(setGenres);
  };

  return (
    <GenreContext.Provider value={{ genres, getGenres }}>
      {props.children}
    </GenreContext.Provider>
  );
};
