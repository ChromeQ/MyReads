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
        books: []
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

            this.setState({ books });
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
                    <SearchPage />
                )} />
            </div>
        )
    }
}

export default BooksApp
