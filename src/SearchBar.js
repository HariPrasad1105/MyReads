import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchResults from './SearchResults';

class SearchBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      searchResults: [],
    }
  }

  changeHandler = (event) => {
    event.persist();

    if (event.target.value.trim().length > 0) {

      BooksAPI.search(event.target.value)
        .then((searchResults) => {
          this.setState(() => ({
            query: event.target.value,
            searchResults: searchResults,
          }))
        });
    } else {
      this.setState({
        query: '',
        searchResults: []
      })
    }

  }

  keyPressHandler = (event) => {
  }

  submitHandler = (event) => {
    event.preventDefault()

    BooksAPI.search(this.state.query)
      .then((books) => {
        this.setState(() => ({
          searchResults: books
        }))
      });
  }


  selectHandler = () => {
    BooksAPI.search(this.state.query)
      .then((searchResults) => {
        this.setState(() => ({
          searchResults: searchResults
        }))
      });
  }

  render() {
    const searchResults = this.state.searchResults;

    return (

      <div className="search-books">
        <div className="search-books-bar">

          <Link to="/">
            <button className="close-search" type="button">Close</button>
          </Link>

          <form onSubmit={this.submitHandler} >
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                onChange={this.changeHandler}
                onKeyPress={this.keyPressHandler}
              />
            </div>
          </form>
        </div>

        {searchResults !== undefined ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {
                searchResults.hasOwnProperty('error') && <div>
                  <p>No Search Results</p>
                </div>
              }
              {
                searchResults.length > 0 && (
                  <SearchResults
                    searchResults={searchResults}
                    selectHandler={this.selectHandler}
                  />
                )
              }
            </ol>
          </div>
        ) : <div><p>No Search Results</p></div>}

      </div>
    );
  }
}

export default SearchBar;