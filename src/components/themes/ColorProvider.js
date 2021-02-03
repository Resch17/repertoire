import React, { useState, createContext } from 'react';

export const ColorContext = createContext();

export const ColorProvider = (props) => {
  const [colors, setColors] = useState([]);
  const [themes, setThemes] = useState([]);

  const getColors = () => {
    return fetch('http://localhost:8088/colors')
      .then((res) => res.json())
      .then((parsed) => {
        setColors(parsed);
        return parsed;
      });
  };

  const getThemes = () => {
    return fetch('http://localhost:8088/themes')
      .then((res) => res.json())
      .then((parsed) => {
        setThemes(parsed);
        return parsed;
      });
  };

  return (
    <ColorContext.Provider value={{ colors, getColors, themes, getThemes }}>
      {props.children}
    </ColorContext.Provider>
  );
};
