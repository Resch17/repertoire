import React, { useContext, useEffect } from 'react';
import { SongContext } from './SongProvider';

export const SongList = () => {
  const { songs, getSongs } = useContext(SongContext);

  useEffect(() => {
    getSongs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h2>Song List</h2>
      <div className="song-list">
        {songs.map(s=><h2 key={s.id}>{s.title}</h2>)}
      </div>
    </>
  )
};
