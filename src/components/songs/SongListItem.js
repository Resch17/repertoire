import React from 'react';
import './Song.css';

export const SongListItem = ({ song, tuning, user }) => {
  return (
    <tr className="song-list-item">
      <td>{song.artist.name}</td>
      <td>{song.title}</td>
      <td>{song.genre.name}</td>
      <td>{tuning.instrument.name}</td>
      <td>{tuning.name}</td>
      <td><i className="far fa-plus-square"></i></td>
      <td><a href={song.url} target="_blank" rel="noreferrer"><i className="fas fa-guitar"></i></a></td>
      <td><a href={song.youtube} target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></td>      
      <td>{user.username}</td>
    </tr>
  );
};
