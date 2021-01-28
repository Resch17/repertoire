import React, { useContext } from 'react';
import { SongContext } from './SongProvider';
import './Song.css';

export const SongSearch = () => {
  const { setSearchTerms } = useContext(SongContext);

  return (
    <div className="song-search">
      <i className="fas fa-search"></i>
      <input
        type="text"
        className="song-search__searchbar"
        autoComplete="off"
        placeholder="Search by song or artist name..."
        onKeyUp={(evt) => setSearchTerms(evt.target.value.toLowerCase())}
      />
    </div>
  );
};
