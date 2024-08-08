import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '645605373059-a6vikcjj7kllve2nfr4lf0p1md8mbujr.apps.googleusercontent.com';

ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
