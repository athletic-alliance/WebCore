import React from 'react';
import './App.css';
import {authenticate} from './services/auth.service';

function App() {
  return (
    <div className="App">
      <div onClick={() => authenticate({username: 'johannes', password: '@Wsehxkxwj92'})} >Span</div>
    </div>
  );
}

export default App;
