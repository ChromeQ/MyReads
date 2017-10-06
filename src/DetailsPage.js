import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class DetailsPage extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
        if (this.props.book) {
            this.setState({ book: this.props.book });
        } else {
            BooksAPI.get(this.props.bookId).then(book => {
                if (book) {
                    this.setState({ book });
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.book && this.state.book !== nextProps.book) {
            this.setState({ book: nextProps.book });
        }
    }

    render() {
        const book = this.state.book;

        return (
            <div className="books-details">
                <div className="go-back" onClick={this.props.history.goBack}>Close</div>
                {book && (
                    <div>
                        <ol className="books-grid">
                            <Book
                                id={book.id}
                                thumbnail={book.imageLinks && book.imageLinks.thumbnail}
                                shelf={book.shelf}
                                onShelfChange={(shelf) => this.props.onShelfChange(book, shelf)}
                            />
                        </ol>
                        <table className="book-details-table">
                            <tbody>
                                <tr>
                                    <td>Title:</td>
                                    <td>{book.title}</td>
                                </tr>
                                {book.subtitle && (
                                    <tr>
                                        <td>Title:</td>
                                        <td>{book.subtitle}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Authors:</td>
                                    <td>{book.authors && book.authors.join(', ')}</td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td>{book.description}</td>
                                </tr>
                                <tr>
                                    <td>Avgerage Rating:</td>
                                    <td>{book.averageRating}</td>
                                </tr>
                                <tr>
                                    <td>Total Ratings:</td>
                                    <td>{book.ratingsCount}</td>
                                </tr>
                                <tr>
                                    <td>Pages:</td>
                                    <td>{book.pageCount}</td>
                                </tr>
                                <tr>
                                    <td>Publisher:</td>
                                    <td>{book.publisher}</td>
                                </tr>
                                <tr>
                                    <td>Published Date:</td>
                                    <td>{book.publishedDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

DetailsPage.propTypes = {
    book: PropTypes.object,
    bookId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default DetailsPage;
