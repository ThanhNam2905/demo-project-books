import * as types from '../constants/ActionTypes';

const STATUS_BOOK = {
    all: -1,
    full: 0,
    soldout: 1
};
var initialState = {
       name: '',
       ma: '',
       status: STATUS_BOOK.all
};

const FilterTable_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            // console.log(action);
            return {
                name: action.filter.name,
                ma: action.filter.ma,
                status: parseInt(action.filter.status, 10)
            };
        default:
            return state;
    }
}

export default FilterTable_Reducer;