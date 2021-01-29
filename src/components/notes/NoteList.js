import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { NoteContext } from './NoteProvider';
import { Note } from './Note';
import { NoteForm } from './NoteForm';
import './Note.css';

export const NoteList = () => {
  const { songId } = useParams();
  const userId = parseInt(localStorage.getItem('rep_user'));
  const { notes } = useContext(NoteContext);
  const [matchNotes, setMatchNotes] = useState([]);

  const noteDialog = useRef();

  useEffect(() => {
    const userNotes = notes.filter((n) => n.userId === userId);
    const notesToUse = userNotes.filter((un) => un.songId === parseInt(songId));
    setMatchNotes(notesToUse);
  }, [songId, notes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="notes__title">Your Notes</div>
      <div className="notes__list">
        {matchNotes.map((sn) => {
          return <Note key={sn.id} note={sn} />;
        })}
      </div>
      <div className="notes__button">
        <div
          className="notes__add-note-button"
          onClick={() => {
            noteDialog.current.showModal();
          }}
        >
          Add a Note
        </div>
      </div>
      <dialog className="note-form-dialog" ref={noteDialog}>
        <div className="note-form-dialog__content">
          <NoteForm />
          <button className="note-form-dialog__close-button"
            onClick={() => {
              noteDialog.current.close();
            }}
          >
            X
          </button>
        </div>
      </dialog>
    </>
  );
};
