import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searched: false,
            query: props.query
        };
    }

    componentDidMount() {
        this.searchInput.value = this.state.query;
        this.searchInput.focus();
    }

    handleSearchChange(event) {
        this.props.onSearchChange(event.target.value);

        if (!this.state.searched) {
            this.setState({ searched: true });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="go-back">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" ref={(input) => { this.searchInput = input }} placeholder="Search by title or author" onChange={this.handleSearchChange.bind(this)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!!this.props.books.length && this.props.books.map((book, i) => (
                            <Link key={i} to={`/book/${book.id}`}>
                                <Book
                                    thumbnail={book.imageLinks && book.imageLinks.thumbnail}
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    onShelfChange={(shelf) => this.props.onShelfChange(book, shelf)}
                                />
                            </Link>
                        ))}

                        {!this.props.books.length && this.searchInput && this.searchInput.value && this.state.searched && (
                            <div className="no-results">No results matching your query</div>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;
