import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SongContext } from './SongProvider';
import { TuningContext } from '../tunings/TuningProvider';
import { UserContext } from '../users/UserProvider';
import { SetlistContext } from '../setlists/SetlistProvider';
import { SongListItem } from './SongListItem';
import { SongSearch } from './SongSearch';

export const SongList = () => {
  // refs for column header arrows - used for sorting
  const artistTHasc = useRef();
  const artistTHdesc = useRef();
  const titleTHasc = useRef();
  const titleTHdesc = useRef();
  const genreTHasc = useRef();
  const genreTHdesc = useRef();
  const instrumentTHasc = useRef();
  const instrumentTHdesc = useRef();

  const { songs, getSongs, searchTerms } = useContext(SongContext);
  const { tunings, getTunings } = useContext(TuningContext);
  const { getUsers, activeLinkSet } = useContext(UserContext);
  const { getSetlists } = useContext(SetlistContext);

  const [filteredSongs, setFiltered] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [sortType, setSortType] = useState('artist');

  const { songId } = useParams();

  const history = useHistory();

  // useEffect to initialize data for tunings, songs, and users on component mounting
  useEffect(() => {
    getTunings().then(getSongs).then(getUsers)
    // .then(getSetlists);
    activeLinkSet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to handle sorting the songs table when the sort type or filtered songs state changes
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

      // sort filteredSongs, which contains either search results or full list of songs if no search terms have been entered
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
        } else {
          return a - b;
        }
      });
      setSorted(sorted);
    };
    sortArray(sortType);
  }, [sortType, filteredSongs]);

  // useEffect to handle search
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

  // function to shrink SongList table when a song is chosen and SongDisplay is shown
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

  // function to hide "select a song" message when a song is chosen and SongDisplay is shown
  const footerStyle = () => {
    if (songId) {
      return {
        display: 'none',
      };
    }
  };

  // random integer generator for random song button functionality
  const randomSong = () => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    let randomInt = getRandomInt(0, songs.length);

    return randomInt + 1;
  };

  // function to remove sort indicator arrows from all fields
  const clearSorts = () => {
    const sortRefs = [
      artistTHasc,
      artistTHdesc,
      titleTHasc,
      titleTHdesc,
      genreTHasc,
      genreTHdesc,
      instrumentTHasc,
      instrumentTHdesc,
    ];
    sortRefs.forEach((ref) => {
      ref.current.classList.add('isHidden');
    });
  };

  // function to show appropriate sort indicator arrow
  const unhideArrow = (ref) => {
    ref.current.classList.remove('isHidden');
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
                  clearSorts();
                  if (sortType === 'artist') {
                    unhideArrow(artistTHdesc);
                    setSortType('artistDesc');
                  } else {
                    unhideArrow(artistTHasc);
                    setSortType('artist');
                  }
                }}
              >
                <div className="song-list__head-content">
                  <div className="song-list__head-arrowup" ref={artistTHasc}>
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  Artist
                  <div
                    className="song-list__head-arrowdown isHidden"
                    ref={artistTHdesc}
                  >
                    <i className="fas fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  clearSorts();
                  if (sortType === 'title') {
                    unhideArrow(titleTHdesc);
                    setSortType('titleDesc');
                  } else {
                    unhideArrow(titleTHasc);
                    setSortType('title');
                  }
                }}
              >
                <div className="song-list__head-content">
                  <div
                    className="song-list__head-arrowup isHidden"
                    ref={titleTHasc}
                  >
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  Song
                  <div
                    className="song-list__head-arrowdown isHidden"
                    ref={titleTHdesc}
                  >
                    <i className="fas fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  clearSorts();
                  if (sortType === 'genre') {
                    unhideArrow(genreTHdesc);
                    setSortType('genreDesc');
                  } else {
                    unhideArrow(genreTHasc);
                    setSortType('genre');
                  }
                }}
              >
                <div className="song-list__head-content">
                  <div
                    className="song-list__head-arrowup isHidden"
                    ref={genreTHasc}
                  >
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  Genre
                  <div
                    className="song-list__head-arrowdown isHidden"
                    ref={genreTHdesc}
                  >
                    <i className="fas fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th
                className="song-list__head-sortable"
                onClick={() => {
                  clearSorts();
                  if (sortType === 'instrument') {
                    unhideArrow(instrumentTHdesc);
                    setSortType('instrumentDesc');
                  } else {
                    unhideArrow(instrumentTHasc);
                    setSortType('instrument');
                  }
                }}
              >
                <div className="song-list__head-content">
                  <div
                    className="song-list__head-arrowup isHidden"
                    ref={instrumentTHasc}
                  >
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  Instrument
                  <div
                    className="song-list__head-arrowdown isHidden"
                    ref={instrumentTHdesc}
                  >
                    <i className="fas fa-arrow-down"></i>
                  </div>
                </div>
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
