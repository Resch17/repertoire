import React, { useContext } from 'react';
import { NoteContext } from './NoteProvider';
import './Note.css';

export const Note = ({ note }) => {
  const { deleteNote } = useContext(NoteContext);
  return (
    <article className="note">
      <div className="note__text">{note.text}</div>
      <div className="note__buttons">
        <i className="fas fa-pencil-alt fa-2x"></i>
        <i
          className="fas fa-trash-alt fa-2x"
          onClick={() => {
            deleteNote(note.id);
          }}
        ></i>
      </div>
    </article>
  );
};
