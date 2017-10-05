import React from 'react';

const ShelfChanger = (props) => {
    // Idially this would be the same shelves object as the main App.js using redux store but I didn't want to pass it down 4 levels of props
    const shelves = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read'
    }

    return (
        <div className="book-shelf-changer">
            <select value={props.currentShelf || 'none'} onChange={(event) => props.onShelfChange(event.target.value)}>
                <option value="" disabled>Move to...</option>
                {Object.keys(shelves).map((shelf, i) => (
                    <option key={i} value={shelf}>{shelves[shelf]}</option>
                ))}
                <option value="none">None</option>
            </select>
        </div>
    );
};

export default ShelfChanger;
