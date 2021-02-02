import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SongContext } from './SongProvider';
import { UserContext } from '../users/UserProvider';
import { SetlistContext } from '../setlists/SetlistProvider';
import './Song.css';

export const SongListItem = ({ song, tuning }) => {
  const history = useHistory();
  const { setSearchTerms } = useContext(SongContext);
  const { addSetlistItem } = useContext(SetlistContext);
  const { users } = useContext(UserContext);
  const songUser = users.find((u) => u.id === song.userId);
  const userId = parseInt(localStorage.getItem('rep_user'));

  const { songId } = useParams();

  const selectedClass = (id) => {
    if (id === parseInt(songId)) {
      return 'song-list-item selected-item';
    } else {
      return 'song-list-item';
    }
  };

  const scrollControl = () => {
    if (songId) {
      let row = document.querySelector('tr.selected-item');
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const addToSetlist = () => {
    addSetlistItem({
      userId,
      songId: song.id,
    });
  };

  useEffect(() => {
    scrollControl();
  }, [songId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <tr
      className={selectedClass(song.id)}
      id={song.id}
      onClick={(evt) => {
        if (!evt.target.id.startsWith('addToSetlist')) {
          setSearchTerms('');
          history.push(`/songs/detail/${song.id}`);
        }
      }}
    >
      <td>{song.artist.name}</td>
      <td>{song.title}</td>
      <td className="text-center">{song.genre.name}</td>
      <td className="text-center">{tuning?.instrument.name}</td>
      <td className="text-center">{tuning?.name}</td>
      <td className="text-center">
        <i
          className="far fa-plus-square fa-2x"
          id={`addToSetlist--${song.id}`}
          onClick={() => {
            addToSetlist();
            history.push('/setlist');
          }}
        ></i>
      </td>
      <td className="text-center">
        <a href={song.url} target="_blank" rel="noreferrer">
          <i className="fas fa-guitar fa-2x"></i>
        </a>
      </td>
      <td className="text-center">
        <a href={song.youtube} target="_blank" rel="noreferrer">
          <i className="fab fa-youtube fa-2x"></i>
        </a>
      </td>
      <td className="text-center">{songUser?.username}</td>
    </tr>
  );
};
