import React from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import Votes from '../Votes'
import Restaurateur from '../Restaurateur'
import Search from '../Search'
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path='/' render={() => (
        <div className="App">
          <Votes />
        </div>
      )} />

      <Route exact={true} path='/restaurateur' render={() => (
        <div className="App">
          <Restaurateur />
        </div>
      )} />

    <Route exact={true} path='/search' render={() => (
      <div className="App">
        <Search />
      </div>
    )} />
  </BrowserRouter>

  );
}

export default App;
