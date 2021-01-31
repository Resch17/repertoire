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
    if (
      newArtistName !== '' &&
      document.querySelector('#artist').value !== ''
    ) {
      const newArtist = {
        name: newArtistName,
      };
      addArtist(newArtist).then((artists) => {
        const thisArtist = artists.find((a) => a.name === newArtistName);
        setAddedArtist(thisArtist);
        setSelectedArtist(thisArtist);
      });
    } else {
      window.alert(
        'Invalid artist name\nEnter artist name in the text box and then click the "Add New Artist" button.'
      );
    }
  };

  return (
    <>
      {filtered.length > 0 ? (
        <h4 className="artist-list__title artist-list__title--select">
          Select Artist:
        </h4>
      ) : (
        <h4
          className="artist-list__title artist-list__title--add"
          onClick={saveArtist}
        >
          Add New Artist
        </h4>
      )}
      <div className="artist-list__list">
        {filtered.map((a) => {
          return (
            <h4
              key={a.id}
              className="artist-option"
              onClick={() => {
                setSelectedArtist(a);
              }}
            >
              {a.name}
            </h4>
          );
        })}
      </div>
    </>
  );
};
