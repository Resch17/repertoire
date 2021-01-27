import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ApplicationViews } from './ApplicationViews';
import { Navbar } from './nav/Navbar';

export const Repertoire = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem('rep_user')) {
          return (
            <>
              <Navbar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
