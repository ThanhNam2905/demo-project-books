import * as types from './../constants/ActionTypes';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const STATUS_BOOK = {
    full : 0,
    soldout: 1
};

// get Data trong localStorage
var getData = JSON.parse(localStorage.getItem('books'));
var initialState = (getData !== null) ? getData : [];

const BookReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETLIST_ALL:
            return state;
        case types.ADD_BOOK:
            // console.log(action);
            var newBook = {
                id: uuidv4(),
                maSach: action.book.maSach,
                tenSach: action.book.tenSach,
                tenTG: action.book.tenTG,
                ngayXB: moment(action.book.ngayXB).format('YYYY-MM-DD'),
                trangThaiSach: action.book.trangThaiSach === STATUS_BOOK.full ? 0 : 1
            };
            state.push(newBook);
            localStorage.setItem('books', JSON.stringify(state));
            return [...state]; // copy Arr trả về newArr
        default:
            return state;
    }
}

export default BookReducer;