import * as types from '../constants/ActionTypes';

var initialState = '';

const SearchBook_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_BOOK:
            // console.log(action);
            return action.keyword;
        default:
            return state;
    }
}

export default SearchBook_Reducer;