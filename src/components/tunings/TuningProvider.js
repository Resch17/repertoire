import React, { useState, createContext } from 'react';

export const TuningContext = createContext();

export const TuningProvider = (props) => {
  const [tunings, setTunings] = useState([]);

  const getTunings = () => {
    return fetch('http://localhost:8088/tunings')
      .then((res) => res.json())
      .then(setTunings);
  };

  return (
    <TuningContext.Provider value={{ tunings, getTunings }}>
      {props.children}
    </TuningContext.Provider>
  );
};
