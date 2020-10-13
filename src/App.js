import React, { Fragment } from 'react';
import './App.css';
import Details from './components/Details';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <BrowserRouter>
        <Route exact path="/:q?/:page?" component={SearchPage} />
        <Route path="/details/:owner/:repo" component={Details} />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
