import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from './Book';


class SearchResults extends Component {

  selectHandler = (event, book) => {
    this.props.selectHandler(event, book);
  }

  getShelfName = (book) => {
    const filteredBook = this.props.userBooks.filter((userBook) => userBook.id === book.id);

    return filteredBook.length === 0 ? 'none' : filteredBook[0].shelf;
  }


  render() {

    const bookSearchResults = this.props.searchResults;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Search Results</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              bookSearchResults.map((book) =>
                < Book
                  key={book.id}
                  book={book}
                  selectHandler={this.selectHandler}
                  shelfName={this.getShelfName(book)}
                />
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}



SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
};


export default SearchResults;