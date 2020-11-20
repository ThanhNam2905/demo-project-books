import * as types from '../constants/ActionTypes';
import moment from 'moment';

const STATUS_BOOK = {
    full: 0,
    soldout: 1
};

var initialState = {
        id: '',
        maSach: '',
        tenSach: '',
        tenTG: '',
        ngayXB: moment().format('YYYY-MM-DD'),
        trangThaiSach: STATUS_BOOK.full
};

const UpdateBookItem_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_BOOK_ITEM:
            // console.log(action);
            return action.book;
        default:
            return state;
    }
}

export default UpdateBookItem_Reducer;