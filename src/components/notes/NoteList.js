import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NoteContext } from './NoteProvider';
import { Note } from './Note';

import './Note.css';

export const NoteList = () => {
  const { songId } = useParams();
  const userId = parseInt(localStorage.getItem('rep_user'));
  const { getNotes } = useContext(NoteContext);
  const [matchNotes, setMatchNotes] = useState([]);
  const [noteState, setNoteState] = useState([]);

  useEffect(() => {
    getNotes().then((notes) => {
      const userNotes = notes.filter((n) => n.userId === userId);
      const notesToUse = userNotes.filter(
        (un) => un.songId === parseInt(songId)
      );
      setMatchNotes(notesToUse);
    });
  }, [songId, noteState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getNotes().then((res) => {
      setNoteState(res);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
