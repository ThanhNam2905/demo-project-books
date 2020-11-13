import React, { Component } from 'react';

class BookControlSort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: '',
                value: 0
            }
        }
    }

    // Handle Click Sort By = name va status 
    onClickSort = async(sortBy, sortValue) => {
        // console.log(sortBy, sortValue);
        await this.setState({ 
            sort: {
               by: sortBy,                           
               value: sortValue
            }
        })
        this.props.onSortBy(this.state.sort);
    }

    render() {
        var { sort } = this.state;

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
                                className={ (sort.by === 'name' && sort.value === 1)
                                            ? "sort-selected" : ''}>
                            <span className="fa fa-sort-alpha-asc pr-5">
                                Tên A-Z
                            </span>
                            </a>
                        </li>
                        <li onClick= {() => this.onClickSort('name', -1)}>
                            <a  role="button" 
                                className={ (sort.by === 'name' && sort.value === -1)
                                            ? "sort-selected" : ''}>
                            <span className="fa fa-sort-alpha-desc pr-5">
                                Tên Z-A
                            </span>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                            <li onClick= {() => this.onClickSort('status', 1)}>
                                <a  role="button" 
                                    className={(sort.by === 'status' && sort.value === 1)
                                                ? "sort-selected" : ''}>Còn Hàng</a>
                            </li>
                            <li onClick= {() => this.onClickSort('status', -1)}>
                                <a  role="button" 
                                    className={(sort.by === 'status' && sort.value === -1)
                                                ? "sort-selected" : ''}>Sold out</a>
                            </li>
                        <li/>
                    </ul>
                </div>
                
            </div>
        );
    }
}

export default BookControlSort;