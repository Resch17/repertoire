import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SongContext } from './SongProvider';
import { ArtistContext } from '../artists/ArtistProvider';
import { ArtistList } from '../artists/ArtistList';
import { GenreContext } from '../genres/GenreProvider';
import { InstrumentContext } from '../instruments/InstrumentProvider';
import { TuningContext } from '../tunings/TuningProvider';
import './SongForm.css';

export const SongForm = () => {
  const { addSong, getSongById, updateSong } = useContext(SongContext);
  const {
    getArtists,
    artists,
    selectedArtist,
    setSelectedArtist,
    setNewArtistName,
  } = useContext(ArtistContext);
  const { getGenres, genres } = useContext(GenreContext);
  const { getInstruments, instruments } = useContext(InstrumentContext);
  const { getTunings, tunings } = useContext(TuningContext);

  const { editSongId } = useParams();

  const userId = parseInt(localStorage.getItem('rep_user'));
  const history = useHistory();
  const artistTextbox = useRef();
  const artistListContainer = useRef();

  const [song, setSong] = useState({
    title: '',
    artistId: 0,
    genreId: 0,
    instrumentId: 0,
    userId,
    tuningId: 0,
    url: '',
    youtube: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  const [filteredArtists, setFilteredArtists] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  useEffect(() => {
    getArtists()
      .then(getGenres)
      .then(getInstruments)
      .then(getTunings)
      .then(() => {
        if (editSongId) {
          getSongById(editSongId).then((parsed) => {
            setSong(parsed);
            setSelectedArtist(artists.find((a) => a.id === parsed.artistId));
            setSelectedInstrument(parsed.instrumentId);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedArtist) {
      artistTextbox.current.value = selectedArtist.name;
      setFilteredArtists([]);
      artistListContainer.current.classList.add('isHidden');
    } else {
      artistTextbox.current.value = '';
      artistListContainer.current.classList.remove('isHidden');
    }
  }, [selectedArtist]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleControlledInputChange = (evt) => {
    const newSong = { ...song };

    let selectedVal = evt.target.value;
    if (evt.target.id.includes('Id')) {
      selectedVal = parseInt(selectedVal);
    }

    if (evt.target.id.includes('instrument')) {
      setSelectedInstrument(selectedVal);
    }

    newSong[evt.target.id] = selectedVal;
    setSong(newSong);
  };

  const handleArtistInputChange = (evt) => {
    const artistInput = evt.target.value;
    if (artistTextbox.current.value !== '' && artistInput !== '') {
      setNewArtistName(artistInput);
    }

    const filtered = artists.filter((a) =>
      a.name.toLowerCase().includes(artistInput.toLowerCase())
    );

    if (filtered.length > 0 && artistInput !== '') {
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists([]);
    }
  };

  const handleClickSaveSong = (e) => {
    e.preventDefault();
    if (!selectedArtist) {
      window.alert('Please select or add an artist');
    }
    if (
      song.genreId === 0 ||
      song.instrumentId === 0 ||
      song.tuningId === 0 ||
      song.url === '' ||
      song.title === '' ||
      song.youtube === ''
    ) {
      window.alert('Please fill in all fields');
    } else {
      setIsLoading(true);
      if (editSongId) {
        updateSong({
          title: song.title,
          artistId: selectedArtist.id,
          genreId: song.genreId,
          tuningId: song.tuningId,
          instrumentId: song.instrumentId,
          userId,
          url: song.url,
          youtube: song.youtube,
          id: song.id,
        }).then(() => {
          clearForm();
          history.push(`/songs/detail/${song.id}`);
        });
      } else {
        addSong({
          title: song.title,
          artistId: selectedArtist.id,
          genreId: song.genreId,
          tuningId: song.tuningId,
          instrumentId: song.instrumentId,
          userId,
          url: song.url,
          youtube: song.youtube,
        }).then(() => {
          clearForm();
          history.push('/');
        });
      }
    }
  };

  const clearForm = () => {
    setSong({
      title: '',
      artistId: 0,
      genreId: 0,
      instrumentId: 0,
      userId,
      tuningId: 0,
      url: '',
      youtube: '',
    });
    setFilteredArtists([]);
    setSelectedArtist(null);
    setSelectedInstrument(null);
    artistTextbox.current.value = '';
  };

  return (
    <section
      className="song-form-container"
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          clearForm();
          history.push('/');
        }
      }}
      tabIndex={0}
    >
      <form className="song-form" id="song-form">
        <div
          className="song-form__close-button"
          onClick={() => {
            clearForm();
            history.push('/');
          }}
        >
          X
        </div>
        <h1 className="song-form__title">
          {editSongId ? <>Edit a Song </> : <> Add a Song </>}
        </h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={song.title}
            className="form-text"
            autoFocus
            autoComplete="off"
            onChange={handleControlledInputChange}
          />
        </div>
        <div className="song-form__fields">
          <div className="song-form__fields--left">
            <div className="form-group">
              <label htmlFor="artist">Artist - Search/Add</label>
              <input
                type="text"
                name="artist"
                id="artist"
                ref={artistTextbox}
                disabled={selectedArtist}
                className="form-text"
                autoComplete="off"
                onChange={handleArtistInputChange}
              />
            </div>
            <div className="artist-list" ref={artistListContainer}>
              <ArtistList filtered={filteredArtists} />
            </div>
          </div>

          <div className="song-form__fields--right">
            <div className="form-group">
              <label htmlFor="genreId">Genre</label>
              <select
                value={song.genreId}
                onChange={handleControlledInputChange}
                name="genreId"
                id="genreId"
                className="form-select"
              >
                <option value="0">Select a genre...</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="instrumentId">Instrument</label>
              <select
                value={song.instrumentId}
                onChange={handleControlledInputChange}
                name="instrumentId"
                id="instrumentId"
                className="form-select"
              >
                <option value="0">Select an instrument...</option>
                {instruments.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tuningId">Tuning</label>
              <select
                value={song.tuningId}
                onChange={handleControlledInputChange}
                name="tuningId"
                disabled={!selectedInstrument}
                id="tuningId"
                className="form-select"
              >
                <option value="0">Select a tuning...</option>
                {tunings
                  .filter((t) => t.instrumentId === selectedInstrument)
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="url">Tab URL</label>
              <input
                type="text"
                name="url"
                id="url"
                value={song.url}
                className="form-text"
                autoComplete="off"
                onChange={handleControlledInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="youtube">YouTube URL</label>
              <input
                type="text"
                name="youtube"
                id="youtube"
                value={song.youtube}
                className="form-text"
                autoComplete="off"
                onChange={handleControlledInputChange}
              />
            </div>
          </div>
        </div>

        <div className="song-form__buttons">
          <button
            className="song-form__button-save"
            onClick={handleClickSaveSong}
            disabled={isLoading}
          >
            {editSongId ? <>Save Song!</> : <>Add song!</>}
          </button>
          {editSongId ? null : (
            <button
              className="song-form__button-clear"
              onClick={(evt) => {
                evt.preventDefault();
                clearForm();
              }}
            >
              Clear Form
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
