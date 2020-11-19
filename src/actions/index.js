import * as types from './../constants/ActionTypes';

export const GETLIST_ALL = () => {
    return {
        type: types.GETLIST_ALL
    }
}

export const addBook = (book) => {
    return {
        type: types.ADD_BOOK,
        book : book
    }
}