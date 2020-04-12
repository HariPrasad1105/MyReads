import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';


class Book extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: this.props.book,
      shelf: '',
    };

  }

  componentDidMount() {
    BooksAPI.get(this.state.book.id)
      .then((book) => {
        this.setState(() => ({
          shelf: book.shelf
        }))
      });
  }

  handleSelect = (event) => {
    event.persist();

    const selectedOption = event.target.value;

    if (this.props.shelfName === 'Search Results') {
      console.log("test")
      BooksAPI.update(this.props.book, selectedOption)
        .then(this.setState(() => ({
          shelf: selectedOption
        })))
    } else {
      BooksAPI.update(this.props.book, selectedOption)
        .then(this.props.selectHandler);
    }

  }

  render() {

    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                'imageLinks' in book ? book.imageLinks.thumbnail : ""}")`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select
              value={this.state.shelf === undefined ? "none" : this.state.shelf}
              onChange={this.handleSelect}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {'authors' in book > 0 ? book.authors.join(", ") : ""}
        </div>
      </div >
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  selectHandler: PropTypes.func.isRequired,
  shelfName: PropTypes.string.isRequired,
}

export default Book;