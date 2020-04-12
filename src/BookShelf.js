import React, { Component } from 'react'
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {

  render() {

    const { shelfName, books, selectHandler } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                books.map(
                  (book, index) => {
                    return (
                      <li key={index}>
                        {
                          <Book
                            book={book}
                            selectHandler={() => selectHandler()}
                            shelfName={shelfName}
                          />
                        }
                      </li>
                    )
                  }
                )
              }
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired,
}

export default BookShelf;