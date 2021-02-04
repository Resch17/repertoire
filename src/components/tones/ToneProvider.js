import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const ToneContext = createContext();

export const ToneProvider = (props) => {
  const [tones, setTones] = useState([]);

  const getTones = () => {
    return fetch(`${apiUrl}/tones`)
      .then((res) => res.json())
      .then((parsed) => {
        setTones(parsed);
        return parsed;
      });
  };

  return (
    <ToneContext.Provider value={{ tones, getTones }}>
      {props.children}
    </ToneContext.Provider>
  );
};
