import React, { useState, createContext } from 'react';

export const SetlistContext = createContext();

export const SetlistProvider = (props) => {
  const [setlists, setSetlists] = useState([]);
  const userId = parseInt(localStorage.getItem('rep_user'));

  const getSetlists = () => {
    return fetch('http://localhost:8088/setlists')
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
      return fetch('http://localhost:8088/setlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setlistObj),
      }).then(getSetlists);
    } else {
      setlistObj.ordinal = 1;
      return fetch('http://localhost:8088/setlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setlistObj),
      }).then(getSetlists);
    }
  };

  const updateSetlistItem = (setlistObj) => {
    return fetch(`http://localhost:8088/setlists/${setlistObj.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setlistObj),
    }).then(getSetlists);
  };

  const deleteSetlistItem = (setlistId) => {
    return fetch(`http://localhost:8088/setlists/${setlistId}`, {
      method: 'DELETE',
    }).then(getSetlists)
  };

  return (
    <SetlistContext.Provider
      value={{ setlists, getSetlists, addSetlistItem, updateSetlistItem, deleteSetlistItem }}
    >
      {props.children}
    </SetlistContext.Provider>
  );
};
