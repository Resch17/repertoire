import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongProvider';
import { NoteContext } from '../notes/NoteProvider';
import { InstrumentContext } from '../instruments/InstrumentProvider';
import { SetlistContext } from '../setlists/SetlistProvider';
import { NoteList } from '../notes/NoteList';
import { useParams, useHistory } from 'react-router-dom';
import { ConfirmDialog } from '../utilities/ConfirmDialog';

export const SongDisplay = () => {
  const { songId } = useParams();
  const userId = parseInt(localStorage.getItem('rep_user'));

  const history = useHistory();

  const [song, setSong] = useState({});
  const [youtubeId, setYoutubeId] = useState('');
  const [instrument, setInstrument] = useState({
    name: '',
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { getNotes, deleteNote } = useContext(NoteContext);
  const { getSongById, deleteSong } = useContext(SongContext);
  const { getInstruments } = useContext(InstrumentContext);
  const { getSetlists, deleteSetlistItem, updateSetlistItem } = useContext(
    SetlistContext
  );

  // on component mount and songId changing, initializes notes, instruments, the selected song, and sets component state for the song, the instrument, and the youtube video (by splitting the youtube URL)
  useEffect(() => {
    getNotes().then(() => {
      getInstruments().then((instruments) => {
        getSongById(songId).then((song) => {
          setSong(song);
          setInstrument(instruments.find((i) => i.id === song.instrumentId));
          const [unused, yt] = song.youtube.split('v='); // eslint-disable-line no-unused-vars
          setYoutubeId(yt);
        });
      });
    });
  }, [songId]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to handle deletion of a song, including downstream effects to notes and setlists
  const handleDelete = () => {
    getNotes()
      .then((notes) => {

        // delete notes associated with this song id, for all users
        const thisSongNotes = notes.filter(
          (n) => n.songId === parseInt(songId)
        );
        thisSongNotes.forEach((note) => {
          deleteNote(note.id);
        });
      })
      .then(() => {
        // delete setlist items that include this song, update ordinals on any other setlist items that would be affected by this song's deletion
        getSetlists().then((setlists) => {
          const thisSongSetlistItems = setlists.filter(
            (sl) => sl.songId === parseInt(songId)
          );
          thisSongSetlistItems.forEach((sli) => {
            setlists.forEach((sl) => {
              if (sl.userId === sli.userId && sl.ordinal > sli.ordinal) {
                sl.ordinal = sl.ordinal - 1;
                updateSetlistItem(sl);
              }
            });
            deleteSetlistItem(sli.id);
          });
        });
      })
      .then(() => {
        deleteSong(songId).then(() => {
          history.push('/');
        });
      });
  };

  return (
    <div className="song-display">
      <div className="song-display__song-info">
        <div className="song-display__song-info-top">
          <div className="song-display__details">
            <h1>Song: {song.title}</h1>
            <h1>Artist: {song.artist?.name}</h1>
            <h1>
              {instrument?.name} - {song.tuning?.name}
            </h1>
          </div>
          <div className="song-display__buttons">
            <div className="song-display__buttons-tabLink">
              <a href={song.url} target="_blank" rel="noreferrer">
                <i className="fas fa-guitar fa-3x"></i>
              </a>
            </div>
            {song.userId === userId ? (
              <div className="song-display__buttons-userButtons">
                <div
                  className="song-display__buttons-delete"
                  onClick={() => {
                    setConfirmOpen(true);
                  }}
                >
                  <i className="fas fa-trash-alt fa-2x"></i>
                </div>
                <div
                  className="song-display__buttons-edit"
                  onClick={() => {
                    history.push(`/songs/edit/${song.id}`);
                  }}
                >
                  <i className="fas fa-pencil-alt fa-2x"></i>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="song-display__notes-container">
          <NoteList />
        </div>
      </div>
      <div className="song-display__youtube">
        <div className="song-display__youtube-pad">
          <iframe
            title={song.title}
            width="500"
            height="350"
            src={`http://www.youtube.com/embed/${youtubeId}`}
          ></iframe>
        </div>
      </div>
      <ConfirmDialog
        title="Delete song?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          handleDelete();
        }}
      >
        Are you sure you want to delete this song?
      </ConfirmDialog>
    </div>
  );
};
