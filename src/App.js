import React from 'react';
// import * as BooksAPI from './BooksAPI';
import './App.css';
import ListUserBooks from './ListUserBooks';
import SearchBar from './SearchBar';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {

  }

  render() {
    return (
      <div className="app">

        <Route
          path='/search'
          component={SearchBar}
        />

        <Route
          exact path='/'
          component={ListUserBooks}
        />

      </div>
    )
  }
}

export default BooksApp
