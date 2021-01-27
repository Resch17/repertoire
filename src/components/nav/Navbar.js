import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../users/UserProvider';

export const Navbar = (props) => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userId = parseInt(localStorage.getItem('rep_user'));

  const thisUser = users.find((u) => u.id === userId);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <div className="navbar__item">
        <div className="navbar__item--title">
          <h1>
            <Link className="navbar__link" to="/">
              REPERTOIRE
            </Link>
          </h1>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--addTab">
          <h2>
            <Link className="navbar__link" to="/songs/add">
              + Add a tab
            </Link>
          </h2>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--songs">
          <h2>
            <Link className="navbar__link" to="/songs">
              Songs
            </Link>
          </h2>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--tune">
          <h2>
            <Link className="navbar__link" to="/tune">
              Tune
            </Link>
          </h2>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--setlist">
          <h2>
            <Link className="navbar__link" to="/setlist">
              Setlist
            </Link>
          </h2>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--user">
          <h4>
            <span>User:</span> {thisUser?.username}
          </h4>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--logout">
          <h2>
            <Link onClick={logout} className="navbar__link" to="/">
              Log Out
            </Link>
          </h2>
        </div>
      </div>
    </nav>
  );
};
