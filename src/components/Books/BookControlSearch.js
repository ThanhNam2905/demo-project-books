import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class BookControlSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keywordSearch: ''
        }
    }
    onChangeKeySearch = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value
        });
    }
    onHandleSearch = () => {
        this.props.onSearchBook(this.state.keywordSearch);
    }

    render() {

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                <input  type="text" 
                        className="form-control" 
                        placeholder="Nhập từ khóa..." 
                        name="keywordSearch"
                        value={ this.state.keywordSearch }
                        onChange={ this.onChangeKeySearch}
                        />
                <span className="input-group-btn">
                    <button className="btn btn-primary btn-custom"
                            type="button"
                            onClick={ this.onHandleSearch }>
                    <span className="fa fa-search mr-5" />Tìm
                    </button>
                </span>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => ({

    onSearchBook: (keyword) => {
        // console.log(keyword);
        dispatch(actions.searchBook(keyword))
    }
})

export default connect(null, mapDispatchToProps)(BookControlSearch);