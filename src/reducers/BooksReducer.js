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

var findIndex = (books, idBook) => {
    var result = -1;
    books.forEach((book, index) => {
      if(book.id === idBook) {
        result = index;
      }
    })
    return result;
  }

const BookReducer = (state = initialState, action) => {

    // Fix loi warning id va indexFind dung nhieu lan trong cac case
    var id = '';
    var indexFind = -1;

    switch (action.type) {
        case types.GETLIST_ALL:
            return state;

        case types.SAVE_BOOK:
            // console.log(action);
            var book = {
                id: action.book.id,
                maSach: action.book.maSach,
                tenSach: action.book.tenSach,
                tenTG: action.book.tenTG,
                ngayXB: moment(action.book.ngayXB).format('YYYY-MM-DD'),
                trangThaiSach: action.book.trangThaiSach 
            };
            if(!book.id) { // trường hợp id ='' (id === null) là Add Book
                book.id = uuidv4();
                state.push(book);
            }else {  // trường hợp co id (id !== null) là Edit Book
                indexFind = findIndex(state, book.id);
                if(indexFind !== -1) {
                    state[indexFind] = book;
                }
            }
            localStorage.setItem('books', JSON.stringify(state));
            return [...state]; // spread operator: ke thua(extend) state => trả về newArr(state new) 

        case types.UPDATE_STATUS_BOOK:
            // console.log(action);
            id = action.id;
            indexFind = findIndex(state, id);

            if(indexFind !== -1) {
                // books[indexFind].trangThaiSach = !books[indexFind].trangThaiSach;
                if(state[indexFind].trangThaiSach == STATUS_BOOK.full) {
                    state[indexFind] = {
                        ...state[indexFind],
                        trangThaiSach: STATUS_BOOK.soldout
                    }
                }
                else if(state[indexFind].trangThaiSach == STATUS_BOOK.soldout){
                    state[indexFind] = {
                        ...state[indexFind],
                        trangThaiSach: STATUS_BOOK.full
                    }
                }
                // Update status thanh cong thi luu vao localStorage
                localStorage.setItem('books', JSON.stringify(state));   
            }
            // console.log(state);
            return [...state];

        case types.DELETE_BOOK_ITEM:
            id = action.id;
            indexFind = findIndex(state, id);
            if(indexFind !== null) {
                state.splice(indexFind, 1);
                localStorage.setItem('books', JSON.stringify(state));
            }
            return [...state];
            
        default:
            return state;
    }
}

export default BookReducer;