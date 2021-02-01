import React, { useState, createContext } from 'react';

export const ToneContext = createContext();

export const ToneProvider = (props) => {
  const [tones, setTones] = useState([]);

  const getTones = () => {
    return fetch('http://localhost:8088/tones')
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
