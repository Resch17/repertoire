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
  const { getSetlists, deleteSetlistItem } = useContext(SetlistContext);

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

  const handleDelete = () => {
    deleteSong(songId).then(() => {
      getNotes()
        .then((notes) => {
          const thisSongNotes = notes.filter((n) => n.songId === songId);
          thisSongNotes.forEach((note) => {
            deleteNote(note.id);
          });
        })
        .then(() => {
          getSetlists().then((setlists) => {
            const thisSongSetlists = setlists.filter(
              (sl) => sl.songId === songId
            );
            thisSongSetlists.forEach((sl) => {
              deleteSetlistItem(sl.id);
            });
          });
        });
    });
    history.push('/');
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
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this song?
      </ConfirmDialog>
    </div>
  );
};
