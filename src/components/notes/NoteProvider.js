import React, { useState, createContext } from 'react';

export const NoteContext = createContext();

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    return fetch('http://localhost:8088/notes')
      .then((res) => res.json())
      .then(setNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
