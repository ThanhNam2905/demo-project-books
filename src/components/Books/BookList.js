import React, { Component } from 'react';
import BookItem from './BookItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

const STATUS_BOOK = {
    all: -1,
    full: 0,
    soldout: 1
};

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterTenSach: '',
            filterMaSach: '',
            filterStatusSach: -1, // -1 -> all, 0 -> Full, 1 -> Sold out
        };
        
    }
    // HandleChange Filter Input
    onHandleChange = async (event) => {
        var name = event.target.name;
        var value = event.target.type === "checkbox" ? event.target.checked : event.target.value ;
        var filter = {
            name: name === 'filterTenSach' ? value : this.state.filterTenSach,
            ma : name === 'filterMaSach' ? value : this.state.filterMaSach,
            status: name === 'filterStatusSach' ? value : this.state.filterStatusSach
        };
        this.props.onFilterTable(filter);
        await this.setState({
            [name] : value
        })
    }
    

    render() {
        // Redux mapStateToProps
        var { filterTable, books, keywordSearch, sort } = this.props;

        var { filterTenSach, filterMaSach, filterStatusSach } = this.state;

        // kiem tra filter co ton tai hay ko
        if(filterTable) {
            // Filter bằng Name
            if(filterTable.name) {
                books = books.filter((book) => {
                    return book.tenSach.toLowerCase().indexOf(filterTable.name) !== -1;
                });
            }
            // Filter bằng Mã sách
            if(filterTable.ma) {
                books = books.filter((book) => {
                    return book.maSach.toLowerCase().indexOf(filterTable.ma) !== -1;
                });
            }
            // Filter bằng Status sách
            books = books.filter((book) => {
                if(filterTable.status == STATUS_BOOK.all) return book;
                else { // truong hop full or soldout
                    return book.trangThaiSach == (parseInt(filterTable.status, 10) == STATUS_BOOK.full ? 0 : 1);
                }
            });
        }
        // Chuc nang Search 
        if(keywordSearch) {
            books = books.filter((book) => {
                return book.tenSach.toLowerCase().indexOf(keywordSearch) !== -1;
            });
        }
        // Chuc Nang Sap xep
        if(sort.by === "name") {
            // trường hợp sap xep theo tenSach
            books.sort((a, b) => {
              if(a.tenSach.toLowerCase() > b.tenSach.toLowerCase()) return sort.value;
              else if(a.tenSach.toLowerCase() < b.tenSach.toLowerCase()) return -sort.value;
              else return 0;
            });
        }else if(sort.by === "status") {
            // trường hợp sap xep theo statusSach
            books.sort((a, b) => {
            if(a.trangThaiSach > b.trangThaiSach) return sort.value;
            else if(a.trangThaiSach < b.trangThaiSach) return -sort.value;
            else return 0;
            });
        }
        // Get Data Book 
        var elementBook = books.map((book, index) => {
            return <BookItem    key={book.id} 
                                index={index} 
                                book={book}
                    />
        }) 

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên sách</th>
                            <th className="text-center">Mã sách</th>
                            <th className="text-center">Ngày XB</th>
                            <th className="text-center">Trạng thái sách</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            <td>
                                <input  type="text" 
                                        className="form-control" 
                                        name="filterTenSach"
                                        value={ filterTenSach }
                                        onChange={ this.onHandleChange }
                                        />
                            </td>
                            <td>
                                <input  type="text" 
                                        className="form-control" 
                                        name="filterMaSach"
                                        value={ filterMaSach }
                                        onChange={ this.onHandleChange }
                                        />
                            </td>
                            <td />
                            <td>
                                <select className="form-control"
                                        name="filterStatusSach"
                                        value={ filterStatusSach }
                                        onChange={ this.onHandleChange }>
                                    <option value={-1}>Tất Cả</option>
                                    <option value={0}>Full</option>
                                    <option value={1}>Sold out</option>
                                </select>
                            </td>
                            <td />
                        </tr>
                        { elementBook }
                    </tbody>
                </table>
            </div>
        );
    }
}
// Redux
const mapStateToProps = (state) => ({
    books: state.books,
    filterTable: state.FilterTable,
    keywordSearch: state.SearchBook,
    sort: state.SortBook
})

const mapDispatchToProps = (dispatch, props) => ({
    
    onFilterTable: (filter) => {
        // console.log(filter);
        dispatch(actions.filterTable(filter))
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(BookList);