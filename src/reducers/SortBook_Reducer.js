import * as types from '../constants/ActionTypes';

var initialState = {
    by: '',
    value: 1 // 1 => a-z or full, -1 => z-a or soldout 
};

const SortBook_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT_BOOK:
            return {
                by: action.sort.by,
                value: action.sort.value
            };
        default:
            return state;
    }
}

export default SortBook_Reducer;