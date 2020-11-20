import React, { Component } from 'react';
import moment from 'moment';
import * as actions from './../../actions/index';
import {connect} from 'react-redux'

const STATUS = {
   full :   0,
   soldout: 1
}
class BookItem extends Component {
    
    onUpdateStatusBook = () => {
        this.props.onUpdateStatusBook(this.props.book.id);
    }
    // Chuc nang Delete Book
    onDeleteBook = () => {
        // Redux mapDispatchToProps
        // convert dispatch { onDeleteBookItem, onCloseForm }  => props
        this.props.onDeleteBookItem(this.props.book.id);
        this.props.onCloseForm();
    }
    // Chuc nang Update Book
    onUpdateBook = () => {
        this.props.onUpdateBookItem(this.props.book);
        this.props.onOpenForm();
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
                    <span   className={book.trangThaiSach == STATUS.full ? "label label-success" : "label label-danger"}
                            onClick={this.onUpdateStatusBook}>
                            { book.trangThaiSach == STATUS.full ? "Full" : "Sold out" }
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch, props) => ({

    onUpdateStatusBook: (id) => { 
        dispatch(actions.updateStatusBook(id))
    },
    onDeleteBookItem: (id) => {
        dispatch(actions.deleteBookItem(id));
    },
    onCloseForm: () => {
        dispatch(actions.closeForm());
    },
    onOpenForm: () => {
        dispatch(actions.openForm());
    },
    onUpdateBookItem: (book) => {
        dispatch(actions.updateBookItem(book));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);