import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NoteContext } from './NoteProvider';
import { ConfirmDialog } from '../utilities/ConfirmDialog';
import './Note.css';

export const Note = ({ note }) => {
  const { deleteNote } = useContext(NoteContext);
  const history = useHistory();

  const handleDelete = () => {
    deleteNote(note.id).then(() => {
      history.push(`/songs/detail/${note.songId}`);
    });
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <article className="note">
      <div className="note__text">{note.text}</div>
      <div className="note__buttons">
        <i className="fas fa-pencil-alt fa-2x"></i>
        <i
          className="fas fa-trash-alt fa-2x"
          onClick={() => {
            setConfirmOpen(true);
          }}
        ></i>
      </div>
      <ConfirmDialog
        title="Delete note?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this note?
      </ConfirmDialog>
    </article>
  );
};
