import React, { useState, createContext } from 'react';

export const SongContext = createContext();

export const SongProvider = (props) => {
  const [songs, setSongs] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');

  const getSongs = () => {
    return fetch('http://localhost:8088/songs?_expand=artist&_expand=genre&_expand=instrument')
      .then((res) => res.json())
      .then(setSongs);
  };

  const getSongById = (id) => {
    return fetch(
      `http://localhost:8088/songs/${id}?_expand=artist&_expand=genre&_expand=tuning&_expand=instrument`
    ).then((res) => res.json());
  };

  return (
    <SongContext.Provider
      value={{ songs, getSongs, searchTerms, setSearchTerms, getSongById }}
    >
      {props.children}
    </SongContext.Provider>
  );
};
