import { v4 as uuidv4 } from 'uuid';
import React, { Component } from 'react';
import './App.css';
import BookControl from './components/Books/BookControl';
import BookList from './components/Books/BookList';
import BookFormAdd from './components/Books/BookFormAdd';
import { findIndex } from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      books: [], // id, ms, tens, ngayxb, tentg, status
      isDisplayFormAdd : false,
      bookEdit: null,
      filter : {
        name: '',
        ma: '',
        status: -1
      },
      keywordSearch: '',
      sort: {
        by: '',
        value: 0
      }
    }
  }

  // ComponentDidMount duoc goi khi F5 lai trang chi chay duy nhat 1 lan 
  componentDidMount = async() => {
    // kiem tra localStorage có khác null hay ko nếu ko thì setState
    // console.log(" localStorage.getItem('books')", localStorage.getItem('books'))
    if(localStorage && localStorage.getItem('books')) {
      await this.setState({
        books: JSON.parse(localStorage.getItem('books'))
      })
    }
  }
  // onRemoveFormAdd
  onRemoveFormAdd = () => {
    this.setState({
      isDisplayFormAdd: false
    })
  }
  // onHandleShowForm Add Books
  onHandleShowForm = () =>{
    if(this.state.isDisplayFormAdd === true && this.state.bookEdit !== null) {
      // truong hop FormEdit chuyen sang trang FormAdd
      this.setState({
      isDisplayFormAdd: true,
      bookEdit: null 
      })
    }
    else {
      // truong hop FormAdd chuyen sang trang FormEdit
      this.setState({
      isDisplayFormAdd: !this.state.isDisplayFormAdd,
      bookEdit: null 
      })
    }
  }
  // onSubmitForm 
  onSubmitForm = (data) => { 
    // console.log(data); 
    var { books } = this.state;
    // Phan biet giua Add va Edit Book bang data.id
    // Neu data.id === '' => Add, ngc lai => Edit
    if(data.id === '') {
      data.id = uuidv4();
      books.push(data);
    } else {
      var indexFind = this.findIndex(data.id);
      books[indexFind] = data;
    } 
    this.setState({
      books: books,
      bookEdit: null
    })
    // localStorage.setIt em('books', books);
    localStorage.setItem('books', JSON.stringify(books));
  }
  // Chuc nang Update Status Sach
  onUpdateStatusBook = (idBook) => {
    // console.log(idBook);
    var { books } = this.state;
    // var indexFind = this.findIndex(idBook);
    var indexFind = findIndex(books, (book) => {
      return book.id === idBook;
    })
    if(indexFind !== -1) {
      // books[indexFind].trangThaiSach = !books[indexFind].trangThaiSach;
      if(books[indexFind].trangThaiSach === 0) {
        books[indexFind].trangThaiSach = 1;
      }
      else {
        books[indexFind].trangThaiSach = 0;
      }
      this.setState({
        books: books
      })
      // Update status thanh cong thi luu vao localStorage
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
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
  // Chuc nang Delete Book
  onDeleteBook = (idBook) => {
    var { books } = this.state;
    var indexFind = this.findIndex(idBook);
    if(indexFind !== -1) {
      books.splice(indexFind, 1);
      this.setState({
        books: books
      })
      // Delete Book thanh cong thi luu vao localStorage
      localStorage.setItem('books', JSON.stringify(books));
    }
    this.onRemoveFormAdd();
  }
  // Show Form Edit khi click vao btn Edit
  isShowFormEditBook = () => {
    this.setState({
      isDisplayFormAdd: true
    })
  }
  // Chuc nang Update Book
  onUpdateBook = (idUpdateBook) => {
    // console.log(idUpdateBook);
    var { books } = this.state;
    var indexFind = this.findIndex(idUpdateBook);
    
    var bookEdit = books[indexFind];
    this.setState({
      bookEdit: bookEdit
    })
    this.isShowFormEditBook();
  }
  // Chuc nang loc du lieu trên Table
  onHandleFilter = (filterTenSach,filterMaSach, filterStatusSach) => {
    // console.log(filterTenSach, ' - ', filterMaSach, ' - ', filterStatusSach);
    filterStatusSach = +filterStatusSach;
    // console.log(typeof(filterStatusSach));
    this.setState({
      filter: {
        name: filterTenSach.toLowerCase(),
        ma: filterMaSach,
        status: filterStatusSach
      }
    })
  }
  onHandleSearch = (key) => {
    this.setState({
      keywordSearch: key.toLowerCase()
    })
  }
  // Chuc nang Sap sep
  onSortBy = (sort) => {
    this.setState({
      sort: sort
    })
  }

   // -------- RENDER ---------------
  render() {

    var { books, isDisplayFormAdd, bookEdit, filter, keywordSearch, sort } = this.state; // cach viet cua ECMA6: var books = this.state.books
    // console.log(filter); 
    // kiem tra filter co ton tai hay ko
    if(filter) {
      // Filter bằng Name
      if(filter.name) {
        books = books.filter((book) => {
          return book.tenSach.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      // Filter bằng Mã sách
      if(filter.ma) {
        books = books.filter((book) => {
          return book.maSach.toLowerCase().indexOf(filter.ma) !== -1;
        });
      }
      // Filter bằng Status sách
      books = books.filter((book) => {
          if(filter.status == -1) return book;
          else {
            return book.trangThaiSach == (filter.status == 1 ? 1 : 0);
          }
        });
    }
    // Chuc nang Search trong Component Search
    if(keywordSearch) {
      books = books.filter((book) => {
          return book.tenSach.toLowerCase().indexOf(keywordSearch) !== -1;
      });
    }
    // Component BookFormAdd
    var showFormAdd = isDisplayFormAdd ? <BookFormAdd   onRemoveFormAdd={this.onRemoveFormAdd}
                                                    onSubmitForm={this.onSubmitForm}
                                                    book={bookEdit}
                                          /> : '';
    // Chuc Nang Sap xep
    if(sort.by === "name") {
      // trường hợp sap xep theo tenSach
      books.sort((a, b) => {
        if(a.tenSach.toLowerCase() > b.tenSach.toLowerCase()) return sort.value;
        else if(a.tenSach.toLowerCase() < b.tenSach.toLowerCase()) return -sort.value;
        else return 0;
      });
    }else {
      // trường hợp sap xep theo statusSach
      books.sort((a, b) => {
        if(a.trangThaiSach > b.trangThaiSach) return sort.value;
        else if(a.trangThaiSach < b.trangThaiSach) return -sort.value;
        else return 0;
      });
    }
    
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Sách</h1>
            <hr />
          </div>
          <div className="row">
            <div className={ isDisplayFormAdd ? "col-xs-3 col-sm-3 col-md-3 col-lg-3" : ''}>
            {/* Conponent FormAdd */}
              { showFormAdd }
            </div>
            <div className={ isDisplayFormAdd ? "col-xs-9 col-sm-9 col-md-9 col-lg-9" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button 
                  type="button" 
                  className="btn btn-primary btn-custom"
                  onClick={ this.onHandleShowForm}>
                <span className="fa fa-plus pr-3" />Thêm Sách
              </button>
              {/* Conponent BookControl */}
              <BookControl onHandleSearch={ this.onHandleSearch}
                           onSortBy={this.onSortBy}
              />
              <div className="row mt-15">
              {/* Conponent BookList */}
                <BookList  books={books}
                           onUpdateStatusBook={ this.onUpdateStatusBook } 
                           onDeleteBook={ this.onDeleteBook}
                           onUpdateBook={this.onUpdateBook}
                           onHandleFilter={this.onHandleFilter}
                           />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
