import { combineReducers } from 'redux';
import BooksReducer from './BooksReducer';

const myReducer = combineReducers({
    books: BooksReducer
});

export default myReducer;