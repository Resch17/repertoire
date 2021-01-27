import React from 'react';
import './Song.css';

export const SongListItem = ({ song }) => {
  return (
    <tr className="song-list-item">
      <td>{song?.artist.name}</td>
      <td>{song.title}</td>
    </tr>
  );
};
