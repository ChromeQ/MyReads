import React from 'react';
import Book from './Book';

const Bookshelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book, i) => (
                        <Book
                            key={i}
                            thumbnail={book.imageLinks && book.imageLinks.thumbnail}
                            title={book.title}
                            authors={book.authors}
                            shelf={book.shelf}
                            onShelfChange={(shelf) => props.onShelfChange(book, shelf)}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
};

export default Bookshelf;
