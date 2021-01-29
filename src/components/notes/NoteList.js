import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoteContext } from './NoteProvider';
import { Note } from './Note';

import './Note.css';

export const NoteList = () => {
  const { songId } = useParams();
  const userId = parseInt(localStorage.getItem('rep_user'));
  const { notes } = useContext(NoteContext);
  const [matchNotes, setMatchNotes] = useState([]);

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
        <div className="notes__add-note-button">Add a Note</div>
      </div>
    </>
  );
};
