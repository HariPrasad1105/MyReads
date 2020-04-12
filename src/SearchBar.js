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
      error: '',
    }
  }

  changeHandler = (event) => {
    event.persist();

    if (event.target.value.trim() !== "") {

      BooksAPI.search(event.target.value)
        .then((searchResults) => {
          this.setState(() => ({
            query: event.target.value,
            searchResults: searchResults,
            error: '',
          }))
        });
    } else {
      this.setState({
        query: '',
        searchResults: []
      })
    }

  }

  submitHandler = (event) => {
    event.preventDefault()

    this.state.query === ''
      ? this.setState({
        error: 'Please enter a search keyword'
      })
      : BooksAPI.search(this.state.query)
        .then((books) => {
          this.setState(() => ({
            error: '',
            searchResults: books,
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

  keyPressHandler = (event) => {

  }

  render() {
    const searchResults = this.state.searchResults;

    console.log(this.state);

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
                (searchResults.hasOwnProperty('error') || this.state.error !== '') && <div>
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