import React, { Component } from 'react';
import BookItem from './BookItem';
import { connect } from 'react-redux';

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            filterTenSach: '',
            filterMaSach: '',
            filterStatusSach: -1, // -1 -> all, 0 -> Full, 1 -> Sold out
        })
        
    }
    // HandleChange Filter Input
    onHandleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.props.onHandleFilter(
            name === 'filterTenSach' ? value : this.state.filterTenSach,
            name === 'filterMaSach' ? value : this.state.filterMaSach,
            name === 'filterStatusSach' ? value : this.state.filterStatusSach
        );
        this.setState({
            [name] : value
        })
    }
    

    render() {
        var { books } = this.props; // cach viet cua ECMA6: var books = this.props.books
        var { filterTenSach, filterMaSach, filterStatusSach} = this.state;
        var elementBook = books.map((book, index) => {
            return <BookItem    key={book.id} 
                                index={index} 
                                book={book}
                                onUpdateStatusBook={this.props.onUpdateStatusBook}
                                onDeleteBook={this.props.onDeleteBook}
                                onUpdateBook={this.props.onUpdateBook}
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
    books: state.books
})

const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);