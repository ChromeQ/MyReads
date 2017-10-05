import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';
import './App.css';

class BooksApp extends React.Component {
    state = {
        shelves: {
            currentlyReading: 'Currently Reading',
            wantToRead: 'Want to Read',
            read: 'Read'
        },
        books: [],
        searchResults: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books });
        });
    }

    handleShelfChange(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            // Update the shelf of the book in the store (the response is not useful in my store structure)
            const books = this.state.books.map(b => (b.id === book.id) ? { ...b, shelf } : b);
            const searchResults = this.state.searchResults.map(b => (b.id === book.id) ? { ...b, shelf } : b);

            this.setState({
                books,
                searchResults
            });
        });
    }

    handleSearchChange(value) {
        BooksAPI.search(value, 10).then((results = []) => {
            // The maxResults don't seem to work so slicing the required length here instead
            let searchResults = Array.isArray(results) ? results.slice(0, 10) : [];

            searchResults = searchResults.map(result => {
                // If the book is in the state list then just pass that book along
                const book = this.state.books.find(book => book.id === result.id);

                return book || result;
            });

            this.setState({
                searchResults
            });
        });
    }

    clearSearchResults() {
        this.setState({
            searchResults: []
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {Object.keys(this.state.shelves).map((shelf, i) => (
                                <Bookshelf
                                    key={i}
                                    title={this.state.shelves[shelf]}
                                    books={this.state.books.filter(book => book.shelf === shelf)}
                                    onShelfChange={this.handleShelfChange.bind(this)}
                                />
                            ))}
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route path='/search' render={() => (
                    <SearchPage
                        books={this.state.searchResults}
                        onSearchChange={this.handleSearchChange.bind(this)}
                        clearSearchResults={this.clearSearchResults.bind(this)}
                        onShelfChange={this.handleShelfChange.bind(this)}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
