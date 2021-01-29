import React from 'react';
import { Login } from './Login';
import { Register } from './Register';
import './Login.css';

export const Auth = () => {
  return (
    <div className="auth">
      <h1 className="auth__title">REPERTOIRE</h1>
      <div className="auth__labels">
        <h2 className="auth__label-login">LOG IN</h2>
        <h2 className="auth__label-or">OR</h2>
        <h2 className="auth__label-register">REGISTER</h2>
      </div>
      <div className="auth__forms">
        <div className="auth__forms-login">
          <Login />
        </div>
        <div className="auth__forms-register">
          <Register />
        </div>
      </div>
    </div>
  );
};
