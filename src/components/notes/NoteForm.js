import React, { useContext, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { NoteContext } from './NoteProvider';

export const NoteForm = () => {
  const { addNote } = useContext(NoteContext);
  const userId = parseInt(localStorage.getItem('rep_user'));
  const { songId } = useParams();
  const [note, setNote] = useState({
    userId,
    songId: parseInt(songId),
    text: '',
  });

  const history = useHistory();
  const textbox = useRef();

  const noteDialog = document.querySelector('.note-form-dialog');

  const handleControlledInputChange = (evt) => {
    const newNote = { ...note };
    let selectedVal = evt.target.value;

    newNote[evt.target.id] = selectedVal;
    setNote(newNote);
  };

  const handleClickSaveNote = () => {
    if (note.text === '') {
      window.alert('No empty notes!');
    } else {
      addNote(note).then(() => {
        noteDialog.close();
        textbox.current.value = '';
        note.text = '';
        history.push(`/songs/detail/${songId}`);
      });
    }
  };

  return (
    <form className="note-form">
      <input
        type="text"
        id="text"
        onChange={handleControlledInputChange}
        autoComplete="off"
        autoFocus
        placeholder="Type your note here!"
        ref={textbox}
        value={note.text}
      />
      <button
        onClick={(evt) => {
          evt.preventDefault();
          handleClickSaveNote();
        }}
      >
        Save Note
      </button>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          textbox.current.value = '';
          note.text = '';
        }}
      >
        Clear
      </button>
    </form>
  );
};
