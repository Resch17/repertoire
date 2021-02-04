import React, { useState, createContext } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const ArtistContext = createContext();

export const ArtistProvider = (props) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [newArtistName, setNewArtistName] = useState('');
  const [addedArtist, setAddedArtist] = useState(null);

  const getArtists = () => {
    return fetch(`${apiUrl}/artists`)
      .then((res) => res.json())
      .then((res) => {
        setArtists(res);
        return res;
      });
  };

  const addArtist = (artistObj) => {
    return fetch(`${apiUrl}/artists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artistObj),
    }).then(getArtists);
  };

  return (
    <ArtistContext.Provider
      value={{
        artists,
        getArtists,
        selectedArtist,
        setSelectedArtist,
        addArtist,
        newArtistName,
        setNewArtistName,
        addedArtist,
        setAddedArtist,
      }}
    >
      {props.children}
    </ArtistContext.Provider>
  );
};
