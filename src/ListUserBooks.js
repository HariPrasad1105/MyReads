import React, { Component } from 'react';
import ShowSearchBar from './ShowSearchBar';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class ListUserBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    };

  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      });
  }

  filterBooksBy(filterBy) {
    return this.state.books.filter(
      (book) => book.shelf === filterBy
    );
  }

  selectHandler = () => {

    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      });
  }

  render() {
    const currentlyReadingBooks = this.filterBooksBy("currentlyReading");
    const wantToReadBooks = this.filterBooksBy("wantToRead");
    const readingNowBooks = this.filterBooksBy("read");

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <BookShelf
              shelfName="Currently Reading"
              books={currentlyReadingBooks}
              selectHandler={this.selectHandler}
            />

            <BookShelf
              shelfName="Want to Read"
              books={wantToReadBooks}
              selectHandler={this.selectHandler}
            />

            <BookShelf
              shelfName="Read"
              books={readingNowBooks}
              selectHandler={this.selectHandler}
            />
          </div>
        </div>

        <ShowSearchBar />

      </div>
    );
  }
}

export default ListUserBooks;