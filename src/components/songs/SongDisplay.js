import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongProvider';
import { InstrumentContext } from '../instruments/InstrumentProvider';
import { NoteList } from '../notes/NoteList';
import { useParams } from 'react-router-dom';

export const SongDisplay = () => {
  const { songId } = useParams();

  const [song, setSong] = useState({});

  const [youtubeId, setYoutubeId] = useState('');

  const { getSongById } = useContext(SongContext);

  const { getInstruments } = useContext(InstrumentContext);

  const [instrument, setInstrument] = useState({
    name: '',
  });

  useEffect(() => {
    getInstruments().then((instruments) => {
      getSongById(songId).then((song) => {
        setSong(song);
        setInstrument(instruments.find((i) => i.id === song.instrumentId));
        const [unused, yt] = song.youtube.split('v='); // eslint-disable-line no-unused-vars
        setYoutubeId(yt);
      });
    });
  }, [songId]); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div className="song-display__buttons-tabLink tooltip">
              <a href={song.url} target="_blank" rel="noreferrer">
                <i className="fas fa-guitar fa-3x"></i>
              </a>
              <span className="tooltiptext">Click to visit tab site.</span>
            </div>
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
    </div>
  );
};
