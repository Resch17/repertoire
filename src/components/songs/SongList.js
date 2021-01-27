import React, { useContext, useEffect } from 'react';
import { SongContext } from './SongProvider';
import { SongListItem } from './SongListItem';

export const SongList = () => {
  const { songs, getSongs } = useContext(SongContext);

  useEffect(() => {
    getSongs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h2>Song List</h2>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Song</th>
          </tr>
        </thead>
        <tbody className="song-list">
          {songs.map((s) => {
            return <SongListItem key={s.id} song={s} />;
          })}
        </tbody>
      </table>
    </>
  );
};
