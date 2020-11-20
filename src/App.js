import React, { Component } from 'react';
import './App.css';
import BookControl from './components/Books/BookControl';
import BookList from './components/Books/BookList';
import BookFormAdd from './components/Books/BookFormAdd';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import moment from 'moment';

const STATUS_BOOK = {
  full : 0,
  soldout: 1
};

class App extends Component {

  findIndex = (idBook) => {
    var { books }= this.state;
    // console.log(idBook);
    var result = -1;
    books.forEach((book, index) => {
      if(book.id === idBook) {
        result = index;
      }
    })
    return result;
  }

  onToggleForm = () => {
    let { UpdateBookItem } = this.props; // mapStateToProps
    if(UpdateBookItem && UpdateBookItem !== '') {  // Edit
      this.props.onOpenForm();
    }else { // Add
      this.props.onToggleForm();
    }
    this.props.onClearBookItem({
      id: '',
      maSach: '',
      tenSach: '',
      tenTG: '',
      ngayXB: moment().format('YYYY-MM-DD'),
      trangThaiSach: STATUS_BOOK.full
    });
  }
  
   // -------- RENDER ---------------
  render() {
    // Redux mapStateToProps chuyễn state trong store(ToggleFormReducer)
    var { isDisplayFormAdd } = this.props; 

    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Sách</h1>
            <hr />
          </div>
          <div className="row">
            <div className={ isDisplayFormAdd === true ? "col-xs-3 col-sm-3 col-md-3 col-lg-3" : ''}>
            {/* Conponent FormAdd */}
              { <BookFormAdd /> }
            </div>
            <div className={ isDisplayFormAdd ? "col-xs-9 col-sm-9 col-md-9 col-lg-9" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button 
                  type="button" 
                  className="btn btn-primary btn-custom"
                  onClick={ this.onToggleForm }>
                <span className="fa fa-plus pr-3" />Thêm Sách
              </button>
              {/* Conponent BookControl */}
              <BookControl onSortBy={this.onSortBy}
              />
              <div className="row mt-15">
              {/* Conponent BookList */}
                <BookList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    isDisplayFormAdd: state.isDisplayForm,
    UpdateBookItem: state.UpdateBookItem
})

const mapDispatchToProps = (dispatch, props) => ({
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearBookItem: (book) => {
      dispatch(actions.updateBookItem(book));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
