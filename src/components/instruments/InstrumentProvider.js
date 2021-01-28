import React, { useState, createContext } from 'react';

export const InstrumentContext = createContext();

export const InstrumentProvider = (props) => {
  const [instruments, setInstruments] = useState([]);

  const getInstruments = () => {
    return fetch('http://localhost:8088/instruments')
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
