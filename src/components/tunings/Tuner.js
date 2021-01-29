import React, { useContext, useEffect } from 'react';
import { UserContext } from '../users/UserProvider';

export const Tuner = () => {
  const { activeLinkSet } = useContext(UserContext);

  useEffect(() => {
    activeLinkSet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <h1>Guitar Tuner!</h1>;
};
