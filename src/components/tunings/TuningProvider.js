import React, { useState, createContext } from 'react';

export const TuningContext = createContext();

export const TuningProvider = (props) => {
  const [tunings, setTunings] = useState([]);

  const getTunings = () => {
    return fetch('http://localhost:8088/tunings?_expand=instrument')
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
