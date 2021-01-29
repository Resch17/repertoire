import React from 'react';
import { Route } from 'react-router-dom';
import { SongProvider } from './songs/SongProvider';
import { SongList } from './songs/SongList';
import { SongDisplay } from './songs/SongDisplay';
import { TuningProvider } from './tunings/TuningProvider';
import { UserProvider } from './users/UserProvider';
import { InstrumentProvider } from './instruments/InstrumentProvider';
import { NoteProvider } from './notes/NoteProvider';
import { Tuner } from './tunings/Tuner';
import { Setlist } from './setlists/Setlist';

export const ApplicationViews = () => (
  <>
    <UserProvider>
      <InstrumentProvider>
        <TuningProvider>
          <SongProvider>
            <NoteProvider>
              <Route exact path="/">
                <SongList />
              </Route>

              <Route exact path="/songs">
                <SongList />
              </Route>
              <Route exact path="/songs/detail/:songId(\d+)">
                <SongList />
                <SongDisplay />
              </Route>

              <Route exact path="/tune">
                <Tuner />
              </Route>

              <Route exact path="/setlist">
                <Setlist />
              </Route>
            </NoteProvider>
          </SongProvider>
        </TuningProvider>
      </InstrumentProvider>
    </UserProvider>
  </>
);
