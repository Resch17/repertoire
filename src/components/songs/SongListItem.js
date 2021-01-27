import React from 'react';
import './Song.css';

export const SongListItem = ({ song, tuning, user }) => {
  return (
    <tr className="song-list-item">
      <td>{song.artist.name}</td>
      <td>{song.title}</td>
      <td className="text-center">{song.genre.name}</td>
      <td className="text-center">{tuning.instrument.name}</td>
      <td className="text-center">{tuning.name}</td>
      <td className="text-center"><i className="far fa-plus-square fa-2x"></i></td>
      <td className="text-center"><a href={song.url} target="_blank" rel="noreferrer"><i className="fas fa-guitar fa-2x"></i></a></td>
      <td className="text-center"><a href={song.youtube} target="_blank" rel="noreferrer"><i className="fab fa-youtube fa-2x"></i></a></td>      
      <td className="text-center">{user.username}</td>
    </tr>
  );
};
