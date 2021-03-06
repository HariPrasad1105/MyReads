import React from 'react';
import PropTypes from 'prop-types';

function toCamelCase(shelfName) {
  return (
    shelfName.slice(0, 1).toLowerCase() +
    shelfName.slice(1).split(" ").join("")
  )
}

function Book(props) {


  const { book, selectHandler, shelfName } = props;

  const camelCasedShelfName = toCamelCase(shelfName);

  console.log(camelCasedShelfName);

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
            value={shelfName === undefined ? "none" : camelCasedShelfName}
            onChange={(e) => selectHandler(e, book)}
            key={book.id}
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

Book.propTypes = {
  book: PropTypes.object.isRequired,
  selectHandler: PropTypes.func.isRequired,
  shelfName: PropTypes.string.isRequired,
}

export default React.memo(Book);