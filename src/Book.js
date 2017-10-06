import React from 'react';
import PropTypes from 'prop-types';
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
            {props.authors && (
                <div className="book-authors">{props.authors.join(', ')}</div>
            )}
        </li>
    );
};

Book.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.string),
    onShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string
};

export default Book;
