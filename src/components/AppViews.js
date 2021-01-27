import React from 'react';
import { Route } from 'react-router-dom';
import { SongProvider } from './songs/SongProvider';
import { SongList } from './songs/SongList';

export const ApplicationViews = () => {
  return (
    <>
      <SongProvider>
        <Route exact path="/">
          <SongList />
        </Route>
      </SongProvider>
    </>
  );
};
