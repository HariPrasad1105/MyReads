import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ShowSearchBar extends Component {
  render() {
    return (
      <div className="open-search">
        <Link to='/search'>
          <button type="button">Add a book</button>
        </Link>
      </div>
    );
  }
}

export default ShowSearchBar;