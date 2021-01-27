import React, { useState, createContext } from 'react';

export const ArtistContext = createContext();

export const ArtistProvider = (props) => {
  const [artists, setArtists] = useState([]);

  const getArtists = () => {
    return fetch('http://localhost:8088/artists')
      .then((res) => res.json())
      .then(setArtists);
  };

  return (
    <ArtistContext.Provider value={{ artists, getArtists }}>
      {props.children}
    </ArtistContext.Provider>
  );
};
