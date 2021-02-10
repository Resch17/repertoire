import React, { useContext } from 'react';
import { ColorContext } from '../themes/ColorProvider';
import { UserContext } from '../users/UserProvider';

export const ThemeSelect = () => {
  const { themes, selectedTheme, setSelectedTheme } = useContext(ColorContext);
  const { updateUser, thisUser } = useContext(UserContext);

  const handleControlledInputChange = (evt) => {
    const selectedVal = parseInt(evt.target.value);
    setSelectedTheme(themes.find((t) => t.id === selectedVal));
    const newUserObject = { ...thisUser };
    newUserObject.themeId = selectedVal;
    updateUser(newUserObject);
  };

  return (
    <div className="theme-select__group">
      <label htmlFor="theme-select">Theme: </label>
      <select
        name="theme-select"
        className="theme-select"
        value={selectedTheme.id}
        onChange={handleControlledInputChange}
      >
        {themes
          .sort((a, b) => a.id - b.id)
          .map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
      </select>
    </div>
  );
};
