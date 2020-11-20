import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class BookControlSort extends Component {

    // Handle Click Sort By = name va status 
    onClickSort = async(sortBy, sortValue) => {
        this.props.onSortBook({
            by: sortBy,
            value: sortValue
        });
    }

    render() {
        console.log(this.props.sort);
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle btn-custom" 
                            type="button" 
                            id="dropdownMenu1" 
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fa fa-caret-square-o-down" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick= {() => this.onClickSort('name', 1)}>
                            <a  role="button" 
                                className={ (this.props.sort.by === 'name' && this.props.sort.value === 1)
                                            ? "sort-selected" : ''}>
                            <span className="fa fa-sort-alpha-asc pr-5">
                                Tên Sách A-Z
                            </span>
                            </a>
                        </li>
                        <li onClick= {() => this.onClickSort('name', -1)}>
                            <a  role="button" 
                                className={ (this.props.sort.by === 'name' && this.props.sort.value === -1)
                                            ? "sort-selected" : ''}>
                            <span className="fa fa-sort-alpha-desc pr-5">
                                Tên Sách Z-A
                            </span>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                            <li onClick= {() => this.onClickSort('status', 1)}>
                                <a  role="button" 
                                    className={(this.props.sort.by === 'status' && this.props.sort.value === 1)
                                                ? "sort-selected" : ''}>Còn Hàng</a>
                            </li>
                            <li onClick= {() => this.onClickSort('status', -1)}>
                                <a  role="button" 
                                    className={(this.props.sort.by === 'status' && this.props.sort.value === -1)
                                                ? "sort-selected" : ''}>Hết Hàng</a>
                            </li>
                        <li/>
                    </ul>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    sort: state.SortBook
})

const mapDispatchToProps = (dispatch, props) => ({
    onSortBook: (sort) => {
        dispatch(actions.sortBook(sort))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(BookControlSort);