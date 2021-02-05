import React, { useState, createContext, useEffect } from 'react';
import { apiUrl } from '../utilities/Settings.js';

export const SetlistContext = createContext();

export const SetlistProvider = (props) => {
  const [setlists, setSetlists] = useState([]);
  const [setlist, setSetlist] = useState([]);
  const userId = parseInt(localStorage.getItem('rep_user'));

  const getSetlists = () => {
    return fetch(`${apiUrl}/setlists`)
      .then((res) => res.json())
      .then((parsed) => {
        setSetlists(parsed);
        return parsed;
      });
  };

  const addSetlistItem = (setlistObj) => {
    const thisUsersSetlist = setlists.filter((sl) => sl.userId === userId);
    if (thisUsersSetlist.length > 0) {
      const sorted = thisUsersSetlist.sort((a, b) => b.ordinal - a.ordinal);
      const newObjOrdinal = sorted[0].ordinal + 1;
      setlistObj.ordinal = newObjOrdinal;
      return fetch(`${apiUrl}/setlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setlistObj),
      }).then(getSetlists);
    } else {
      setlistObj.ordinal = 1;
      return fetch(`${apiUrl}/setlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setlistObj),
      }).then(getSetlists);
    }
  };

  const updateSetlistItem = (setlistObj) => {
    return fetch(`${apiUrl}/setlists/${setlistObj.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setlistObj),
    }).then(getSetlists);
  };

  const deleteSetlistItem = (setlistId) => {
    return fetch(`${apiUrl}/setlists/${setlistId}`, {
      method: 'DELETE',
    }).then(getSetlists);
  };

  useEffect(() => {
    getSetlists();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SetlistContext.Provider
      value={{
        setlists,
        getSetlists,
        addSetlistItem,
        updateSetlistItem,
        deleteSetlistItem,
        setlist,
        setSetlist,
        setSetlists,
      }}
    >
      {props.children}
    </SetlistContext.Provider>
  );
};
