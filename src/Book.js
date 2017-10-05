import React from 'react';
import ShelfChanger from './ShelfChanger';

const Book = (props) => {
    return (
        <li className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.thumbnail})` }}></div>
                <ShelfChanger currentShelf={props.shelf} onShelfChange={props.onShelfChange} />
            </div>
            <div className="book-title">{props.title}</div>
            {/* Some books do not have any authors so must protect against this */}
            <div className="book-authors">{props.authors && props.authors.join(', ')}</div>
        </li>
    );
};

export default Book;
