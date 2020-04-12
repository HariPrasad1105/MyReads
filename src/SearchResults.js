import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';


class SearchResults extends Component {

  render() {

    const { searchResults, selectHandler } = this.props;

    return (
      <div>
        <ol>
          {
            (<BookShelf
              shelfName="Search Results"
              books={searchResults}
              selectHandler={() => selectHandler()}
            />)
          }
        </ol>
      </div>
    );
  }
}


SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired,
};


export default SearchResults;