import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NoteContext } from './NoteProvider';
import './Note.css';

export const Note = ({ note }) => {
  const { deleteNote } = useContext(NoteContext);
  const history = useHistory();

  const handleDelete = () => {
    deleteNote(note.id).then(() => {
      history.push(`/songs/detail/${note.songId}`);
    });
  };

  return (
    <article className="note">
      <div className="note__text">{note.text}</div>
      <div className="note__buttons">
        <i className="fas fa-pencil-alt fa-2x"></i>
        <i
          className="fas fa-trash-alt fa-2x"
          onClick={() => {
            window.confirm('Are you sure you want to delete this note?') &&
              handleDelete();
          }}
        ></i>
      </div>
    </article>
  );
};
