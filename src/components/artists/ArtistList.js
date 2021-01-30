import React, { useContext } from 'react';
import { ArtistContext } from './ArtistProvider';

export const ArtistList = ({ filtered }) => {
  const {
    setSelectedArtist,
    addArtist,
    newArtistName,
    setAddedArtist,
  } = useContext(ArtistContext);

  const saveArtist = () => {
    if (newArtistName !== '') {
      const newArtist = {
        name: newArtistName,
      };
      addArtist(newArtist).then((artists) => {
        const thisArtist = artists.find((a) => a.name === newArtistName);
        setAddedArtist(thisArtist);
        setSelectedArtist(thisArtist);
      });
    } else {
      window.alert('Invalid artist name');
    }
  };

  return (
    <>
      {filtered.length > 0 ? (
        <h4>Select an artist</h4>
      ) : (
        <h4 onClick={saveArtist}>Add an artist</h4>
      )}
      {filtered.map((a) => {
        return (
          <h4
            key={a.id}
            onClick={() => {
              setSelectedArtist(a);
            }}
          >
            {a.name}
          </h4>
        );
      })}
    </>
  );
};
