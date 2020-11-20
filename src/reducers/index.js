import { combineReducers } from 'redux';
import BooksReducer from './BooksReducer';
import ToggleFormReducer from './ToggleFormReducer';
import UpdateBookItem_Reducer from './UpdateBookItem_Reducer';
import FilterTable_Reducer from './FilterTable_Reducer';
import SearchBook_Reducer from './SearchBook_Reducer';
import SortBook_Reducer from './SortBook_Reducer';

const myReducer = combineReducers({
    books: BooksReducer,
    isDisplayForm: ToggleFormReducer,
    UpdateBookItem: UpdateBookItem_Reducer,
    FilterTable: FilterTable_Reducer,
    SearchBook: SearchBook_Reducer,
    SortBook: SortBook_Reducer
});

export default myReducer;