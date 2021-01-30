import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SongContext } from './SongProvider';
import { TuningContext } from '../tunings/TuningProvider';
import { UserContext } from '../users/UserProvider';
import { SongListItem } from './SongListItem';
import { SongSearch } from './SongSearch';

export const SongList = () => {
  const { songs, getSongs, searchTerms } = useContext(SongContext);
  const { tunings, getTunings } = useContext(TuningContext);
  const { getUsers, activeLinkSet } = useContext(UserContext);

  const [filteredSongs, setFiltered] = useState([]);

  const { songId } = useParams();

  const history = useHistory();

  useEffect(() => {
    getTunings().then(getSongs).then(getUsers);
    activeLinkSet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchTerms !== '') {
      const subset = songs.filter((song) => {
        return (
          song.title.toLowerCase().includes(searchTerms) ||
          song.artist.name.toLowerCase().includes(searchTerms)
        );
      });
      setFiltered(subset);
    } else {
      setFiltered(songs);
    }
  }, [searchTerms, songs]);

  const tableStyle = () => {
    if (songId) {
      return {
        display: 'block',
        overflowY: 'scroll',
        maxHeight: '150px',
        width: '100%',
      };
    }
  };

  const footerStyle = () => {
    if (songId) {
      return {
        display: 'none',
      };
    }
  };

  const randomSong = () => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    let randomInt = getRandomInt(0, songs.length);

    return randomInt + 1;
  };

  return (
    <>
      <div className="top-row">
        <SongSearch />
        <div
          className="randomize-button"
          onClick={() => {
            history.push(`/songs/detail/${randomSong()}`);
          }}
        >
          <p>Random Song!</p>
        </div>
      </div>
      <div className="song-list-container">
        <table className="song-list">
          <thead className="song-list__head">
            <tr>
              <th>Artist</th>
              <th>Song</th>
              <th>Genre</th>
              <th>Instrument</th>
              <th>Tuning</th>
              <th>Add to Setlist</th>
              <th>Link</th>
              <th>YouTube</th>
              <th>Added by:</th>
            </tr>
          </thead>
          <tbody className="song-list__body" style={tableStyle()}>
            {filteredSongs
              .sort((a, b) => a.artist.name.localeCompare(b.artist.name))
              .map((s) => {
                const tuning = tunings.find((t) => t.id === s.tuningId);
                return (
                  <SongListItem
                    key={s.id}
                    song={s}
                    tuning={tuning}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="song-message" style={footerStyle()}>
        Select a song above to get started!
      </div>
    </>
  );
};
