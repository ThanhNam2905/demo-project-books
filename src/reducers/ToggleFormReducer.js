import * as types from '../constants/ActionTypes';

var initialState = false;

const ToggleFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_FORM_BOOK:
            return state = true;
        case types.CLOSE_FORM_BOOK:
            return state = false;
        case types.TOGGLE_FORM_BOOK:
            return !state;
        default:
            return state;
    }
}

export default ToggleFormReducer;