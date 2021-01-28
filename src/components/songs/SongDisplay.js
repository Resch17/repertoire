import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongProvider';
import { InstrumentContext } from '../instruments/InstrumentProvider';
import { useParams } from 'react-router-dom';

export const SongDisplay = () => {
  const { songId } = useParams();

  const userId = parseInt(localStorage.getItem('rep_user'));

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
        const [unused, yt] = song.youtube.split('v=');
        setYoutubeId(yt);
      });
    });
  }, [songId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="song-display">
      <div className="song-display__song-info">
        <div className="song-display__details">
          <h1>Song: {song.title}</h1>
          <h1>Artist: {song.artist?.name}</h1>
          <h1>
            {instrument?.name} - {song.tuning?.name}
          </h1>
        </div>
        <div className="song-display__buttons"></div>
      </div>
      <div className="song-display__youtube"></div>
      <iframe
        title={song.title}
        width="700"
        height="400"
        src={`http://www.youtube.com/embed/${youtubeId}`}
      ></iframe>
    </div>
  );
};
