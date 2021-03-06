import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { apiUrl } from '../utilities/Settings.js';
import './Login.css';

export const Login = (props) => {
  const email = useRef();
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`${apiUrl}/users?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem('rep_user', exists.id);
        history.push('/');
      } else {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            id="email"
            className="form-control"
            autoComplete="off"
            required
            autoFocus
          />
          <button type="submit">GO</button>
        </form>
      </section>
    </main>
  );
};
