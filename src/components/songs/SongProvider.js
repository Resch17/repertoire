import React, { useState, createContext } from 'react';

export const SongContext = createContext();

export const SongProvider = (props) => {
  const [songs, setSongs] = useState([]);

  const getSongs = () => {
    return fetch('http://localhost:8088/songs?_expand=artist&_expand=genre')
      .then((res) => res.json())
      .then(setSongs);
  };

  return (
    <SongContext.Provider value={{ songs, getSongs }}>
      {props.children}
    </SongContext.Provider>
  );
};
