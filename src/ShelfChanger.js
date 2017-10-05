import React from 'react';

const ShelfChanger = (props) => {
    // Idally this would be the same shelves object as the main App.js using redux store
    const shelves = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read'
    };

    return (
        <div className="book-shelf-changer">
            <select value={props.currentShelf} onChange={(event) => props.onShelfChange(event.target.value)}>
                <option value="none" disabled>Move to...</option>
                {Object.keys(shelves).map((shelf, i) => (
                    <option key={i} value={shelf}>{shelves[shelf]}</option>
                ))}
                <option value="none">None</option>
            </select>
        </div>
    );
};

export default ShelfChanger;
