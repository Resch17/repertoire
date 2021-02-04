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
  const [sorted, setSorted] = useState([]);
  const [sortType, setSortType] = useState('artist');

  const { songId } = useParams();

  const history = useHistory();

  useEffect(() => {
    getTunings().then(getSongs).then(getUsers);
    activeLinkSet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        artist: 'artist',
        artistDesc: 'artistDesc',
        title: 'title',
        titleDesc: 'titleDesc',
        genre: 'genre',
        genreDesc: 'genreDesc',
        instrument: 'instrument',
        instrumentDesc: 'instrumentDesc',
      };
      const sortProperty = types[type];
      const sorted = [...filteredSongs].sort((a, b) => {
        if (sortProperty === 'artist') {
          return a.artist.name.localeCompare(b.artist.name);
        } else if (sortProperty === 'artistDesc') {
          return b.artist.name.localeCompare(a.artist.name);
        } else if (sortProperty === 'genre') {
          return a.genre.name.localeCompare(b.genre.name);
        } else if (sortProperty === 'genreDesc') {
          return b.genre.name.localeCompare(a.genre.name);
        } else if (sortProperty === 'instrument') {
          return a.instrument.name.localeCompare(b.instrument.name);
        } else if (sortProperty === 'instrumentDesc') {
          return b.instrument.name.localeCompare(a.instrument.name);
        } else if (sortProperty === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortProperty === 'titleDesc') {
          return b.title.localeCompare(a.title);
        }
      });
      setSorted(sorted);
    };
    sortArray(sortType);
  }, [sortType, filteredSongs]);

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
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  if (sortType === 'artist') {
                    setSortType('artistDesc');
                  } else {
                    setSortType('artist');
                  }
                }}
              >
                Artist
              </th>
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  if (sortType === 'title') {
                    setSortType('titleDesc');
                  } else {
                    setSortType('title');
                  }
                }}
              >
                Song
              </th>
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  if (sortType === 'genre') {
                    setSortType('genreDesc');
                  } else {
                    setSortType('genre');
                  }
                }}
              >
                Genre
              </th>
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  if (sortType === 'instrument') {
                    setSortType('instrumentDesc');
                  } else {
                    setSortType('instrument');
                  }
                }}
              >
                Instrument
              </th>
              <th>Tuning</th>
              <th>Add to Setlist</th>
              <th>Link</th>
              <th>YouTube</th>
              <th>Added by:</th>
            </tr>
          </thead>
          <tbody className="song-list__body" style={tableStyle()}>
            {sorted.map((s) => {
              const tuning = tunings.find((t) => t.id === s.tuningId);
              return <SongListItem key={s.id} song={s} tuning={tuning} />;
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
