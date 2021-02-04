import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const SongContext = createContext();

export const SongProvider = (props) => {
  const [songs, setSongs] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');

  const getSongs = () => {
    return fetch(
      `${apiUrl}/songs?_expand=artist&_expand=genre&_expand=instrument`
    )
      .then((res) => res.json())
      .then(setSongs);
  };

  const getSongById = (id) => {
    return fetch(
      `${apiUrl}/songs/${id}?_expand=artist&_expand=genre&_expand=tuning&_expand=instrument`
    ).then((res) => res.json()).then((song)=>song);
  };

  const addSong = (songObj) => {
    return fetch(`${apiUrl}/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songObj),
    }).then(getSongs);
  };

  const deleteSong = (id) => {
    return fetch(`${apiUrl}/songs/${id}`, {
      method: 'DELETE',
    }).then(getSongs);
  }

  const updateSong = (song) => {
    return fetch(`http://localhost:8088/songs/${song.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    }).then(getSongs);
  }

  return (
    <SongContext.Provider
      value={{
        songs,
        getSongs,
        searchTerms,
        setSearchTerms,
        getSongById,
        addSong,
        deleteSong,
        updateSong
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
};
