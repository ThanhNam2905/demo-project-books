import * as types from './../constants/ActionTypes';

// Get Danh sách Books
export const GETLIST_ALL = () => {
    return {
        type: types.GETLIST_ALL
    }
}
// Chuc nang Save Book
export const saveBook = (book) => {
    return {
        type: types.SAVE_BOOK,
        book : book
    }
}
// Đóng mở Form 
export const openForm = () => {
    return {
        type: types.OPEN_FORM_BOOK
    }
}
export const closeForm = () => {
    return {
        type: types.CLOSE_FORM_BOOK
    }
}
export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM_BOOK
    }
}
export const updateStatusBook = (id) => {
    return {
        type: types.UPDATE_STATUS_BOOK,
        id: id
    }
}
export const deleteBookItem = (id) => {
    return {
        type: types.DELETE_BOOK_ITEM,
        id: id
    }
}
export const updateBookItem = (book) => {
    return {
        type: types.UPDATE_BOOK_ITEM,
        book: book
    }
}
export const filterTable = (filter) => {
    return {
        type: types.FILTER_TABLE,
        filter: filter // filter la 1 object chua filterName,filterMa, filterStatus
    }
}
export const searchBook = (keyword) => {
    return {
        type: types.SEARCH_BOOK,
        keyword: keyword
    }
}
export const sortBook = (sort) => {
    return {
        type: types.SORT_BOOK,
        sort: sort // sort la 1 object gom by va value
    }
}