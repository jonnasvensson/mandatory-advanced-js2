import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Navigate from './Navigate.js';
import Home from './Home.js';
import Add from './Add.js';
import Edit from './Edit.js';
import Details from './Details.js';


function App() {
  return (
    <div className="App">
      <header>
        <span className="spanHeader"><h2>MOVIES</h2></span>
      </header>
      <Router>
          <Navigate />
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/movies/:id" component={Details} />
      </Router>
    </div>
  );
}

export default App;
