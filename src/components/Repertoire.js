import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ApplicationViews } from './AppViews';
import { Navbar } from './nav/Navbar';
import { Auth } from './auth/Auth';
import { UserProvider } from './users/UserProvider';
import './Repertoire.css';

export const Repertoire = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem('rep_user')) {
          return (
            <>
              <UserProvider>
                <Navbar />
              </UserProvider>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />

    <Route path="/auth">
      <Auth />
    </Route>
  </>
);
