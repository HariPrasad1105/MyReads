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

  updateResuls = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      });
  }

  selectHandler = (e, book) => {
    e.persist();

    const selectedOption = e.target.value;

    BooksAPI.update(book, selectedOption)
      .then(this.updateResuls);
  }

  render() {

    console.log(this.state);

    const shelfFilterNames = ["currentlyReading", "wantToRead", "read"];

    const shelfNames = ["Currently Reading", "Want To Read", "Read"];

    const userBooksShelf = shelfFilterNames.map((shelfName) => this.filterBooksBy(shelfName));

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            {
              shelfNames.map(
                (shelfName, index) => <BookShelf
                  key={index}
                  shelfName={shelfName}
                  books={userBooksShelf[index]}
                  selectHandler={this.selectHandler}
                />
              )
            }
          </div>
        </div>

        <ShowSearchBar />

      </div>
    );
  }
}

export default ListUserBooks;