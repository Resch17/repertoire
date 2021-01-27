import React, { useContext, useEffect } from 'react';
import { SongContext } from './SongProvider';
import { TuningContext } from '../tunings/TuningProvider';
import { SongListItem } from './SongListItem';
import { UserContext } from '../users/UserProvider';

export const SongList = () => {
  const { songs, getSongs } = useContext(SongContext);
  const { tunings, getTunings } = useContext(TuningContext);
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers().then(getTunings).then(getSongs);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
          {songs.map((s) => {
            const tuning = tunings.find((t) => t.id === s.tuningId);
            const user = users.find((u) => u.id === s.userId);
            return (
              <SongListItem key={s.id} song={s} tuning={tuning} user={user} />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
