import React from 'react';
import { useHistory } from 'react-router-dom';
import './Setlist.css';

export const SetlistItem = ({ song }) => {
  const history = useHistory();

  return (
    <div className="setlist-item">
      <h1
        onClick={() => {
          history.push(`/songs/detail/${song.id}`);
        }}
      >
        {song.artist.name} - {song.title}
      </h1>
    </div>
  );
};
