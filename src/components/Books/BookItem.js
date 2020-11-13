import React, { Component } from 'react';
const moment = require('moment');

class BookItem extends Component {
    
    onUpdateStatusBook = () => {
        // console.log(this.props.book.id);
        this.props.onUpdateStatusBook(this.props.book.id);
    }
    // Chuc nang Delete Book
    onDeleteBook = () => {
        this.props.onDeleteBook(this.props.book.id);
    }
    // Chuc nang Update Book
    onUpdateBook = () => {
        this.props.onUpdateBook(this.props.book.id);
    }

    render() {
        var { book, index } = this.props;

        return (
            <tr>
                <td>{index +1}</td>
                <td>{book.tenSach}</td>
                <td>{book.maSach}</td>
                <td>{moment(book.ngayXB).format('DD/MM/YYYY')}</td>
                <td className="text-center">
                    <span   className={book.trangThaiSach === 0 ? "label label-success" : "label label-danger"}
                            onClick={this.onUpdateStatusBook}>
                            { book.trangThaiSach === 0 ? "Full" : "Sold out" }
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" 
                            className="btn btn-warning"
                            onClick={this.onUpdateBook}>
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>
                    &nbsp;
                    <button type="button" 
                            className="btn btn-danger"
                            onClick={ this.onDeleteBook }>
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default BookItem;