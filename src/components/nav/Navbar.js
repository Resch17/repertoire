import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../users/UserProvider';
import { ColorContext } from '../themes/ColorProvider';
import { ThemeSelect } from './ThemeSelect';

export const Navbar = () => {
  const history = useHistory();
  const { users, getUsers, thisUser, setThisUser } = useContext(UserContext);
  const {
    themes,
    getColors,
    colors,
    getThemes,
    selectedTheme,
    setSelectedTheme,
  } = useContext(ColorContext);

  const defaultTheme = {
    id: 1,
    name: 'Default (Dark)',
    backgroundColorId: 1,
    accentTextColorId: 2,
    primaryTextColorId: 3,
    secondaryBackgroundColorId: 4,
  };

  const userId = parseInt(localStorage.getItem('rep_user'));

  useEffect(() => {
    getThemes()
      .then(getColors)
      .then(getUsers)
      .then((returned) => {
        setThisUser(returned.find((u) => u.id === userId));
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (users.length > 0) {
      setSelectedTheme(themes.find((t) => t.id === thisUser.themeId));
    }
  }, [thisUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedTheme && colors.length > 0) {
      const bgColor = colors.find(
        (c) => c.id === selectedTheme.backgroundColorId
      );
      const secBgColor = colors.find(
        (c) => c.id === selectedTheme.secondaryBackgroundColorId
      );
      const accentColor = colors.find(
        (c) => c.id === selectedTheme.accentTextColorId
      );
      const primaryTextColor = colors.find(
        (c) => c.id === selectedTheme.primaryTextColorId
      );

      document.documentElement.style.setProperty(
        '--background-color',
        bgColor.hex
      );
      document.documentElement.style.setProperty(
        '--secondary-background-color',
        secBgColor.hex
      );
      document.documentElement.style.setProperty(
        '--accent-text-color',
        accentColor.hex
      );
      document.documentElement.style.setProperty(
        '--primary-text-color',
        primaryTextColor.hex
      );
    }
  }, [selectedTheme, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    setSelectedTheme(defaultTheme);
    setTimeout(() => {
      localStorage.clear();
      history.push('/');
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar__item-logo">
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
              + Add a Song
            </Link>
          </h2>
        </div>
      </div>
      <div className="navbar__item">
        <div className="navbar__item--songs">
          <h2>
            <Link className="navbar__link" to="/">
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
        <ThemeSelect />
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
