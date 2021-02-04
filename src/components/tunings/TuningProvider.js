import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const TuningContext = createContext();

export const TuningProvider = (props) => {
  const [tunings, setTunings] = useState([]);

  const getTunings = () => {
    return fetch(`${apiUrl}/tunings?_expand=instrument`)
      .then((res) => res.json())
      .then((parsed) => {
        setTunings(parsed);
        return parsed;
      });
  };

  return (
    <TuningContext.Provider value={{ tunings, getTunings, setTunings }}>
      {props.children}
    </TuningContext.Provider>
  );
};
