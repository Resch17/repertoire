import React, { useContext, useEffect } from 'react';
import { UserContext } from '../users/UserProvider';

export const Setlist = () => {
  const { activeLinkSet } = useContext(UserContext);

  useEffect(() => {
    activeLinkSet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <h1>Setlist!</h1>;
};
