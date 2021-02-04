import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const InstrumentContext = createContext();

export const InstrumentProvider = (props) => {
  const [instruments, setInstruments] = useState([]);

  const getInstruments = () => {
    return fetch(`${apiUrl}/instruments`)
      .then((res) => res.json())
      .then((instruments) => {
        setInstruments(instruments);
        return instruments;
      });
  };

  return (
    <InstrumentContext.Provider value={{ instruments, getInstruments }}>
      {props.children}
    </InstrumentContext.Provider>
  );
};
