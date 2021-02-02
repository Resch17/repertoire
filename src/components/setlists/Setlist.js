import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../users/UserProvider';
import { SongContext } from '../songs/SongProvider';
import { SetlistContext } from './SetlistProvider';
import { SetlistItem } from './SetlistItem';
import './Setlist.css';

export const Setlist = () => {
  const userId = parseInt(localStorage.getItem('rep_user'));
  const { activeLinkSet, getUsers, users } = useContext(UserContext);
  const { getSetlists, updateSetlistItem } = useContext(SetlistContext);
  const { getSongs, songs } = useContext(SongContext);
  const [setlist, setSetlist] = useState([]);
  const [thisUser, setThisUser] = useState({});

  useEffect(() => {
    activeLinkSet();
    getUsers()
      .then((parsed) => {
        setThisUser(parsed.find((u) => u.id === userId));
      })
      .then(getSongs)
      .then(() => {
        getSetlists().then((parsed) => {
          setSetlist(parsed.filter((s) => s.userId === userId));
          setThisUser(users.find((u) => u.id === userId));
        });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [dragId, setDragId] = useState();

  const handleDrag = (evt) => {
    setDragId(evt.currentTarget.id);
  };

  const handleDrop = (evt) => {
    const newSetlist = [...setlist];
    const dragItem = newSetlist.find((sl) => sl.id === parseInt(dragId));
    const dropItem = newSetlist.find(
      (sl) => sl.id === parseInt(evt.currentTarget.id)
    );

    const dragItemOrdinal = dragItem.ordinal;
    const dropItemOrdinal = dropItem.ordinal;

    const newSetlistState = newSetlist.map((sl) => {
      if (sl.id === parseInt(dragId)) {
        sl.ordinal = dropItemOrdinal;
      }
      if (sl.id === parseInt(evt.currentTarget.id)) {
        sl.ordinal = dragItemOrdinal;
      }
      return sl;
    });

    setSetlist(newSetlistState);
    changeAPIsetlist(setlist);
  };

  const changeAPIsetlist = () => {
    setlist.forEach((sl) => {
      updateSetlistItem(sl);
    });
  };

  if (setlist.length > 0) {
    return (
      <>
        <div className="setlist-container">
          <div className="setlist-toprow">
            {thisUser ? (
              <h1>{thisUser?.username}'s Setlist</h1>
            ) : (
              <h1>Your Setlist</h1>
            )}
          </div>
          <div className="setlist-list">
            {setlist
              .sort((a, b) => a.ordinal - b.ordinal)
              .map((item) => {
                const song = songs.find((s) => s.id === item.songId);
                return (
                  <SetlistItem
                    key={song.id}
                    song={song}
                    id={item.id}
                    handleDrag={handleDrag}
                    handleDrop={handleDrop}
                  />
                );
              })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Add songs to your setlist from Songs list!</h1>
      </>
    );
  }
};
