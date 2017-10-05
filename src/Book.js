import React from 'react';
import ShelfChanger from './ShelfChanger';

const Book = (props) => {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.thumbnail})` }}></div>
                    <ShelfChanger currentShelf={props.shelf} onShelfChange={props.onShelfChange} />
                </div>
                <div className="book-title">{props.title}</div>
                <div className="book-authors">{props.authors.join(', ')}</div>
            </div>
        </li>
    );
};

export default Book;
