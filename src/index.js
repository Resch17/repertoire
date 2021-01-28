import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Repertoire } from './components/Repertoire';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Repertoire style={{maxHeight: '100vh'}} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// added max-height of 100vh above to limit app from scrolling