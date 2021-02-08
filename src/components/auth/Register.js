import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { apiUrl } from '../utilities/Settings.js';
import './Login.css';

export const Register = (props) => {
  const username = useRef();
  const email = useRef();
  // const verifyPassword = useRef()
  const conflictDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`${apiUrl}/users?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch(`${apiUrl}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.current.value,
            username: username.current.value,
            themeId: 1
          }),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty('id')) {
              localStorage.setItem('rep_user', createdUser.id);
              history.push('/');
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--register">
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--register" onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          ref={username}
          type="text"
          name="username"
          className="form-control"
          autoComplete="off"
          required
        />
        <label htmlFor="inputEmail"> Email address </label>
        <input
          ref={email}
          type="email"
          name="email"
          className="form-control"
          autoComplete="off"
          required
        />
        <button type="submit"> GO </button>
      </form>
    </main>
  );
};
