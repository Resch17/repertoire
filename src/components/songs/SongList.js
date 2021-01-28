import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongProvider';
import { TuningContext } from '../tunings/TuningProvider';
import { UserContext } from '../users/UserProvider';
import { SongListItem } from './SongListItem';
import { SongSearch } from './SongSearch';

export const SongList = () => {
  const { songs, getSongs, searchTerms } = useContext(SongContext);
  const { tunings, getTunings } = useContext(TuningContext);
  const { users, getUsers } = useContext(UserContext);

  const [filteredSongs, setFiltered] = useState([]);

  useEffect(() => {
    getUsers().then(getTunings).then(getSongs);
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

  return (
    <>
      <div className="top-row">
        <SongSearch />
        <div className="randomize-button">
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
          <tbody className="song-list__body">
            {filteredSongs.map((s) => {
              const tuning = tunings.find((t) => t.id === s.tuningId);
              const user = users.find((u) => u.id === s.userId);
              return (
                <SongListItem key={s.id} song={s} tuning={tuning} user={user} />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="song-message">Select a song above to get started!</div>
    </>
  );
};
