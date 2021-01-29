import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const activeLinkSet = () => {
    const songsLink = document.querySelector('.navbar__item--songs');
    const tuneLink = document.querySelector('.navbar__item--tune');
    const setlistLink = document.querySelector('.navbar__item--setlist');
    const activeClass = 'navbar__item--active';

    const linkArray = [songsLink, tuneLink, setlistLink];

    linkArray.forEach((el) => {
      el.classList.remove(activeClass);
    });

    if (window.location.href.search('setlist') > -1) {
      setlistLink.classList.add(activeClass);
    } else if (window.location.href.search('tune') > -1) {
      tuneLink.classList.add(activeClass);
    } else {
      songsLink.classList.add(activeClass);
    }
  };

  const getUsers = () => {
    return fetch('http://localhost:8088/users')
      .then((res) => res.json())
      .then(setUsers);
  };

  return (
    <UserContext.Provider value={{ users, getUsers, activeLinkSet }}>
      {props.children}
    </UserContext.Provider>
  );
};
