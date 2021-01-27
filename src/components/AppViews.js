import React from 'react';
import { Route } from 'react-router-dom';
import { SongProvider } from './songs/SongProvider';
import { SongList } from './songs/SongList';
import { TuningProvider } from './tunings/TuningProvider';
import { UserProvider } from './users/UserProvider';

export const ApplicationViews = () => (
  <>
    <UserProvider>
      <TuningProvider>
        <SongProvider>
          <Route exact path="/">
            <SongList />
          </Route>
        </SongProvider>
      </TuningProvider>
    </UserProvider>
  </>
);
