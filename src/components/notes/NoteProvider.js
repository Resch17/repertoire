import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const NoteContext = createContext();

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    return fetch(`${apiUrl}/notes`)
      .then((res) => res.json())
      .then((notes) => {
        setNotes(notes);
        return notes;
      });
  };

  const deleteNote = (noteId) => {
    return fetch(`${apiUrl}/notes/${noteId}`, {
      method: 'DELETE',
    }).then(getNotes);
  };

  const addNote = (noteObj) => {
    return fetch(`${apiUrl}/notes`, {
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
