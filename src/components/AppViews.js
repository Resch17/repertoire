import React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SongProvider } from './songs/SongProvider';
import { SongList } from './songs/SongList';
import { SongDisplay } from './songs/SongDisplay';
import { TuningProvider } from './tunings/TuningProvider';
import { ToneProvider } from './tones/ToneProvider';
import { UserProvider } from './users/UserProvider';
import { InstrumentProvider } from './instruments/InstrumentProvider';
import { NoteProvider } from './notes/NoteProvider';
import { Tuner } from './tunings/Tuner';
import { Setlist } from './setlists/Setlist';
import { SongForm } from './songs/SongForm';
import { ArtistProvider } from './artists/ArtistProvider';
import { GenreProvider } from './genres/GenreProvider';
import { SetlistProvider } from './setlists/SetlistProvider';
import { defaultTheme } from './themes/defaultTheme';
import { ColorProvider } from './themes/ColorProvider';

export const ApplicationViews = () => (
  <>
    <ColorProvider>
      <ThemeProvider theme={defaultTheme}>
        <UserProvider>
          <GenreProvider>
            <ArtistProvider>
              <InstrumentProvider>
                <TuningProvider>
                  <SongProvider>
                    <NoteProvider>
                      <SetlistProvider>
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

                        <Route exact path="/songs/add">
                          <SongList />
                          <SongForm />
                        </Route>

                        <ToneProvider>
                          <Route exact path="/tune">
                            <Tuner />
                          </Route>
                        </ToneProvider>
                        <Route exact path="/setlist">
                          <Setlist />
                        </Route>
                      </SetlistProvider>
                    </NoteProvider>
                  </SongProvider>
                </TuningProvider>
              </InstrumentProvider>
            </ArtistProvider>
          </GenreProvider>
        </UserProvider>
      </ThemeProvider>
    </ColorProvider>
  </>
);
