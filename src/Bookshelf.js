import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

const Bookshelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                {props.books.length ? (
                    <ol className="books-grid">
                        {props.books.map((book, i) => (
                            <Link key={i} to={`/book/${book.id}`}>
                                <Book
                                    thumbnail={book.imageLinks && book.imageLinks.thumbnail}
                                    title={book.title}
                                    authors={book.authors || []}
                                    shelf={book.shelf}
                                    onShelfChange={(shelf) => props.onShelfChange(book, shelf)}
                                />
                            </Link>
                        ))}
                    </ol>
                ) : (
                    <div className="no-results">There are no books on this shelf yet</div>
                )}
            </div>
        </div>
    )
};

Bookshelf.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default Bookshelf;
