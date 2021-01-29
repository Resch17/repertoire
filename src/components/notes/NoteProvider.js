import React, { useState, createContext } from 'react';

export const NoteContext = createContext();

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    return fetch('http://localhost:8088/notes')
      .then((res) => res.json())
      .then((notes) => {
        setNotes(notes);
        return notes;
      });
  };

  const deleteNote = (noteId) => {
    return fetch(`http://localhost:8088/notes/${noteId}`, {
      method: 'DELETE',
    }).then(getNotes);
  };

  const addNote = (noteObj) => {
    return fetch('http://localhost:8088/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteObj),
    }).then(getNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, deleteNote, setNotes, addNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
